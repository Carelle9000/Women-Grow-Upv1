<?php

namespace App\Http\Controllers;

use App\Models\Members;
use App\Models\MessageUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MessageUserController extends Controller
{
    public function storeChat(Request $request)
    {
        Log::info('Message request data:', $request->all());

        $validated = $request->validate([
            'recipient_id' => 'required|exists:members,id',
            'content' => 'required|string',
        ]);

        $message = MessageUser::create([
            'sender_id' => Auth::id(),
            'recipient_id' => $validated['recipient_id'],
            'content' => $validated['content'],
            'timestamp' => now(),
        ]);

        $recipient = Members::find($validated['recipient_id']);
        $recipient->increment('messages');

        return response()->json([
            'id' => $message->id,
            'senderId' => $message->sender_id,
            'recipientId' => $message->recipient_id,
            'content' => $message->content,
            'timestamp' => $message->timestamp,
        ], 201);
    }

    public function show($recipientId)
    {
        $messages = MessageUser::where(function ($query) use ($recipientId) {
            $query->where('sender_id', Auth::id())
                  ->where('recipient_id', $recipientId);
        })->orWhere(function ($query) use ($recipientId) {
            $query->where('sender_id', $recipientId)
                  ->where('recipient_id', Auth::id());
        })->orderBy('timestamp', 'asc')->get();

        return response()->json($messages->map(function ($message) {
            return [
                'id' => $message->id,
                'senderId' => $message->sender_id,
                'recipientId' => $message->recipient_id,
                'content' => $message->content,
                'timestamp' => $message->timestamp,
            ];
        }));
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
            'consent' => 'required|boolean',
        ]);

        $message = MessageUser::create($validated);

        return response()->json(['message' => 'Message reçu avec succès.'], 200);
    }
}