<?php

namespace App\Http\Controllers;

use App\Models\Thematic;
use App\Models\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ForumController extends Controller
{
    // 1 - Liste des sujets (GET /api/forum)
    public function index()
    {
        $thematics = Thematic::with(['user', 'replies.user'])
                        ->open()
                        ->latest()
                        ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $thematics
        ]);
    }

    // 2 - Voir un sujet (GET /api/forum/{slug})
    public function show(Thematic $thematic)
    {
        // Charger l'utilisateur, puis charger la relation 'replies'
        // avec une contrainte qui charge récursivement tous les enfants.
        $thematic->load(['user', 'replies' => function ($query) {
            // Ceci utilise la relation 'childrenRecursive' que nous avons définie dans le modèle Reply.
            $query->with('user', 'childrenRecursive');
        }]);
        return response()->json([
            'success' => true,
            'data' => $thematic
        ]);
    }

    // 3 - Ajouter des utilisateurs dans un sujet (POST /api/forum/{thematic}/users)
    public function addUsers(Request $request, Thematic $thematic)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id'
        ]);

        $thematic->users()->attach($request->input('user_ids'));

        return response()->json([
            'success' => true,
            'message' => 'Utilisateurs ajoutés avec succès'
        ]);
    }

    // 4 - Créer un sujet (POST /api/forum)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10',
        ]);

        $thematic = Thematic::create([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'user_id' => auth()->id(),
            'slug' => Str::slug($request->input('title')),
            'is_open' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Sujet créé avec succès',
            'data' => $thematic
        ], 201);
    }

    // 5 - Fermer un sujet (POST /api/forum/{thematic}/close)
    public function close(Thematic $thematic)
    {
        // Idéalement, ceci devrait être géré par une Policy : $this->authorize('close', $thematic);
        if (auth()->id() !== $thematic->user_id) {
            abort(403, 'Action non autorisée.');
        }

        $thematic->update(['is_open' => false]);

        return response()->json([
            'success' => true,
            'message' => 'Débat clos avec succès',
            'data' => $thematic
        ]);
    }

    // 6 - Ajouter une réponse à un sujet (POST /api/forum/{thematic}/replies)
    public function storeReply(Request $request, Thematic $thematic)
    {
        if (!$thematic->is_open) {
            abort(403, 'Ce débat est clos.');
        }

        $request->validate([
            'content' => 'required|string|min:5',
            'parent_id' => 'nullable|exists:replies,id',
        ]);

        $reply = Reply::create([
            'content' => $request->input('content'),
            'thematic_id' => $thematic->id,
            'user_id' => auth()->id(),
            'parent_id' => $request->input('parent_id')
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Réponse ajoutée',
            'data' => $reply
        ], 201);
    }

    // 7 - Ajouter une réponse via slug (POST /api/forum/{slug}/replies)
    public function storeReplyBySlug(Request $request, $slug)
    {
        $thematic = Thematic::where('slug', $slug)->firstOrFail();
        return $this->storeReply($request, $thematic);
    }

    // 8 - Modifier une réponse (PUT /api/forum/replies/{reply})
    public function updateReply(Request $request, Reply $reply)
    {
        // Idéalement, ceci devrait être géré par une Policy : $this->authorize('update', $reply);
        if (auth()->id() !== $reply->user_id) {
            abort(403, 'Action non autorisée.');
        }

        $request->validate([
            'content' => 'required|string|min:5'
        ]);

        $reply->update([
            'content' => $request->input('content'),
            'edited_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Réponse mise à jour',
            'data' => $reply
        ]);
    }

    // 9 - Supprimer un sujet (DELETE /api/forum/{thematic})
    public function destroy(Thematic $thematic)
    {
        // Idéalement, ceci devrait être géré par une Policy : $this->authorize('delete', $thematic);
        $user = auth()->user();
        // Corrected authorization: Guests can't delete, and only owners or admins can.
        if (!$user || ($user->id !== $thematic->user_id && !$user->hasRole('admin'))) {
            abort(403, 'Action non autorisée.');
        }

         $thematic->replies()->delete();
        $thematic->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sujet supprimé avec succès'
        ]);
    }
}
