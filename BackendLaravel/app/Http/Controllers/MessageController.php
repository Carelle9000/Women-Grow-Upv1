<?php
namespace App\Http\Controllers;

use App\Models\MessageUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class MessageController extends Controller
{
    public function unreadCount(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non authentifié'
                ], 401);
            }

            $count = MessageUser::where('recipient_id', $user->id)
                            ->where('read', false)
                            ->count();

            return response()->json([
                'success' => true,
                'count' => $count
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur dans unreadCount: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur serveur'
            ], 500);
        }
    }
    // For chat messages (used by MembersPage.jsx)
    public function storeChat(Request $request)
{
    // Vérifier si les données sont au format camelCase ou snake_case
    $recipientId = $request->input('recipientId') ?? $request->input('recipient_id');
    $content = $request->input('content');
    
    // Validation manuelle
    if (!$recipientId) {
        return response()->json([
            'message' => 'Le champ recipient_id est requis.',
            'errors' => ['recipient_id' => ['Le champ recipient_id est requis.']]
        ], 422);
    }
    
    if (!$content) {
        return response()->json([
            'message' => 'Le champ content est requis.',
            'errors' => ['content' => ['Le champ content est requis.']]
        ], 422);
    }
    
    // Vérifier si l'utilisateur existe
    $recipient = User::find($recipientId);
    
    if (!$recipient) {
        return response()->json([
            'message' => 'L\'utilisateur sélectionné n\'existe pas.',
            'errors' => ['recipient_id' => ['L\'utilisateur sélectionné n\'existe pas.']]
        ], 422);
    }
    
    // Création du message
    $message = MessageUser::create([
        'sender_id' => auth()->id(),
        'recipient_id' => $recipientId,
        'content' => $content,
        'timestamp' => now(),
    ]);
    
    return response()->json($message, 201);
}

    // Dans MessageController.php, ajoutez une nouvelle méthode
public function storeChatMessage(Request $request)
{
    // Validation simplifiée
    $request->validate([
        'recipient_id' => 'required|integer',
        'content' => 'required|string|max:1000',
    ]);
    
    // Vérification manuelle que l'utilisateur existe
    $recipient = User::find($request->recipient_id);
    
    if (!$recipient) {
        return response()->json([
            'message' => 'Utilisateur non trouvé',
            'errors' => ['recipient_id' => ['L\'utilisateur sélectionné n\'existe pas.']]
        ], 404);
    }
    
    // Création du message
    $message = MessageUser::create([
        'sender_id' => auth()->id(),
        'recipient_id' => $request->recipient_id,
        'content' => $request->content,
        'timestamp' => now(),
    ]);
    
    return response()->json($message, 201);
}

    // Fetch messages for a user
    public function show($recipientId)
    {
        $messages = MessageUser::where(function ($query) use ($recipientId) {
            $query->where('sender_id', auth()->id())
                  ->where('recipient_id', $recipientId);
        })->orWhere(function ($query) use ($recipientId) {
            $query->where('sender_id', $recipientId)
                  ->where('recipient_id', auth()->id());
        })->orderBy('timestamp', 'asc')->get();

        return response()->json($messages);
    }
}