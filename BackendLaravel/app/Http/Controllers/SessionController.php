<?php 
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function index()
    {
        $timeout = now()->subMinutes(15);
        $activeSessions = DB::table('sessions')
            ->where('last_activity', '>=', $timeout->getTimestamp())
            ->whereNotNull('user_id')
            ->pluck('user_id')
            ->unique();
    
        \Log::info('Active Sessions:', ['user_ids' => $activeSessions]);
    
        $users = DB::table('users')
            ->whereIn('id', $activeSessions)
            ->select('id', 'prenom', 'nom', 'email')
            ->get();
            \Log::info('Active Users:', ['users' => $users->toArray()]);
        return response()->json($users);
    }
}