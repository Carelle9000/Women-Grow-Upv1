<?php
namespace App\Http\Controllers;

use App\Models\Members;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function index()
    {
        $members = Members::all()->map(function ($member) {
            return [
                'id' => $member->id,
                'name' => $member->name,
                'joinDate' => $member->join_date, // Ensure correct format, e.g., "Avril 2025"
                'role' => $member->role,
                'online' => $member->online,
                'color' => $member->color ?? 'bg-gray-500',
                'initial' => strtoupper(substr($member->name, 0, 1)),
                'topics' => $member->topics ?? 0,
                'messages' => $member->messages ?? 0,
            ];
        });

        return response()->json($members);
    }
}