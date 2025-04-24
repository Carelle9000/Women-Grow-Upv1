<?php
// app/Http/Controllers/Api/CalendarController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    // Récupère tous les événements de l'utilisateur
    public function index()
    {
        return response()->json(
            Event::where('user_id', Auth::id())->get()
        );
    }

    // Crée un nouvel événement
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'start' => 'required|date_format:Y-m-d H:i:s',
            'end' => 'nullable|date_format:Y-m-d H:i:s|after:start',
            'color' => 'nullable|string|regex:/^#[a-f0-9]{6}$/i',
            'description' => 'nullable|string'
        ]);

        $event = Auth::user()->events()->create($validated);


        return response()->json([
            'status' => 'success',
            'event' => $event
        ], 201);
    }

    // Affiche un événement spécifique
    public function show(Event $event)
    {
        $this->checkOwnership($event);
        return response()->json($event);
    }

    // Met à jour un événement
    public function update(Request $request, Event $event)
    {
        $this->checkOwnership($event);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'start' => 'sometimes|date',
            'end' => 'nullable|date|after:start',
            'color' => 'nullable|string|max:7',
            'description' => 'nullable|string'
        ]);

        $event->update($validated);

        return response()->json($event);
    }

    // Supprime un événement
    public function destroy(Event $event)
    {
        $this->checkOwnership($event);
        $event->delete();
        return response()->noContent();
    }

    // Récupère les événements dans une plage de dates
    public function getByRange($start, $end)
    {
        return response()->json(
            Event::where('user_id', Auth::id())
                ->where(function($query) use ($start, $end) {
                    $query->whereBetween('start', [$start, $end])
                          ->orWhereBetween('end', [$start, $end]);
                })
                ->get()
        );
    }

    // Vérifie que l'utilisateur est bien propriétaire de l'événement
    private function checkOwnership(Event $event)
    {
        if ($event->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
    }
}