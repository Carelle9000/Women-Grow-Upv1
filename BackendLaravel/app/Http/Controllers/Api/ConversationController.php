<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user(); // Récupère l'utilisateur connecté

        // Récupère ses conversations, triées par dernière interaction
        $conversations = Conversation::where('user_id', $user->id)
            ->orderBy('last_interaction', 'desc')
            ->get();

        return response()->json($conversations);
    }
}
