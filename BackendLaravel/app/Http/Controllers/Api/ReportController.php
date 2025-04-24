<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'nullable|string',
            'type' => 'required|in:incident,request,compliment,other'
        ]);

        $report = Report::create([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'type' => $request->type,
            'user_id' => Auth::id(),
            'status' => 'pending'
        ]);

        return response()->json($report, 201);
    }

    public function index()
    {
        return response()->json(Report::all());
    }
    
    public function show($id)
    {
        return response()->json(Report::findOrFail($id));
    }

    public function update(Request $request, Report $report)
{
    $validated = $request->validate([
        'title' => 'sometimes|string|max:255',
        'description' => 'sometimes|string',
        'location' => 'nullable|string',
        'type' => 'sometimes|in:incident,request,compliment,other',
        'status' => 'sometimes|in:pending,in_progress,resolved',
    ]);

    $report->update($validated);

    return response()->json([
        'success' => true,
        'data' => $report,
        'message' => 'Report updated successfully'
    ]);
}

public function destroy(Report $report)
{
    $report->delete();

    return response()->json([
        'success' => true,
        'message' => 'Report supprime avec succes'
    ]);
}

    
}