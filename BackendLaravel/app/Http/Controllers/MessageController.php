<?php
namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // For contact form (your current store method)
    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
            'consent' => 'required|boolean',
        ]);

        $message = Message::create($validated);

        return response()->json(['message' => 'Message reçu avec succès.'], 200);
    }

    // For chat messages (used by MembersPage.jsx)
    public function storeChat(Request $request)
    {
        $validated = $request->validate([
            'recipientId' => 'required|exists:users,id', // Assuming recipientId refers to a user
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(), // Assuming authenticated user
            'recipient_id' => $validated['recipientId'],
            'content' => $validated['content'],
            'timestamp' => now(),
        ]);

        return response()->json($message, 201);
    }

    // Fetch messages for a user
    public function show($recipientId)
    {
        $messages = Message::where(function ($query) use ($recipientId) {
            $query->where('sender_id', auth()->id())
                  ->where('recipient_id', $recipientId);
        })->orWhere(function ($query) use ($recipientId) {
            $query->where('sender_id', $recipientId)
                  ->where('recipient_id', auth()->id());
        })->orderBy('timestamp', 'asc')->get();

        return response()->json($messages);
    }
}