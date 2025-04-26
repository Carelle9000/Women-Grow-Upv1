<?php

namespace App\Http\Controllers;
use App\Models\Message;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
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
}
