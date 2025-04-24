<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->unreadNotifications;

        return response()->json([
            'success' => true,
            'notificattions' => $notifications,
            'message' => 'notification cree avec succès'
        ]);    }

    public function markAsRead()
    {
        auth()->user()->unreadNotifications->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'La notification a ete marquee comme  lue'
        ]);   
     }
}
