<?php

namespace App\Http\Controllers;

use App\Models\Thematic;
use App\Models\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ForumController extends Controller
{
    // Liste des sujets (GET /api/forum)
    public function index()
    {
        $thematics = Thematic::with(['user', 'replies'])
                        ->open()
                        ->latest()
                        ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $thematics
        ]);
    }

    // Voir un sujet (GET /api/forum/{slug})
    public function show(Thematic $thematic)
    {
        $thematic->load(['user', 'replies.user', 'replies.children.user']);

        return response()->json([
            'success' => true,
            'data' => $thematic
        ]);
    }

    // Ajouter des utilisateurs dans un sujet (POST /api/forum/{thematic}/users)

        public function addUsers(Request $request, Thematic $thematic)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id'
        ]);

        $thematic->users()->attach($request->user_ids);

        return response()->json([
            'success' => true,
            'message' => 'Utilisateurs ajoutés avec succès'
        ]);
    }


    // Créer un sujet (POST /api/forum)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string|min:10',
        ]);

        $thematic = Thematic::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->id(),
            'slug' => Str::slug($request->title),
            'is_open' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Sujet créé avec succès',
            'data' => $thematic
        ], 201);
    }

    // Fermer un sujet (POST /api/forum/{thematic}/close)
    public function close(Thematic $thematic)
    {
        if (auth()->id() !== $thematic->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Action non autorisée'
            ], 403);
        }

        $thematic->update(['is_open' => false]);

        return response()->json([
            'success' => true,
            'message' => 'Débat clos avec succès',
            'data' => $thematic
        ]);
    }

    // Ajouter une réponse (POST /api/forum/{thematic}/replies)
    public function storeReply(Request $request, Thematic $thematic)
    {
        if (!$thematic->is_open) {
            return response()->json([
                'success' => false,
                'message' => 'Ce débat est clos'
            ], 403);
        }

        $request->validate([
            'content' => 'required|string|min:5',
            'parent_id' => 'nullable|exists:replies,id',
        ]);

        $reply = Reply::create([
            'content' => $request->content,
            'thematic_id' => $thematic->id,
            'user_id' => auth()->id(),
            'parent_id' => $request->parent_id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Réponse ajoutée',
            'data' => $reply
        ], 201);
    }

    /**
 * Supprime un sujet (DELETE /api/forum/{thematic})
 */
public function destroy(Thematic $thematic)
{
    // Vérifie que l'utilisateur est l'auteur ou un admin
    if (auth()->id() !== $thematic->user_id && !auth()->user()->isAdmin()) {
        return response()->json([
            'success' => false,
            'message' => 'Action non autorisée'
        ], 403);
    }

    // Supprime toutes les réponses associées
    $thematic->replies()->delete();
    
    // Supprime le sujet
    $thematic->delete();

    return response()->json([
        'success' => true,
        'message' => 'Sujet supprimé avec succès'
    ]);
}

/**
 * Modifie une réponse (PUT /api/forum/replies/{reply})
 */
public function updateReply(Request $request, Reply $reply)
{
    // Vérifie que l'utilisateur est l'auteur de la réponse
    if (auth()->id() !== $reply->user_id) {
        return response()->json([
            'success' => false,
            'message' => 'Action non autorisée'
        ], 403);
    }

    $request->validate([
        'content' => 'required|string|min:5'
    ]);

    $reply->update([
        'content' => $request->content,
        'edited_at' => now() // Ajoute un marqueur d'édition
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Réponse mise à jour',
        'data' => $reply
    ]);
}
}