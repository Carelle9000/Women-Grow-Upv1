<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required_without:media',
            'content' => 'required_without:media',
            'media' => 'required_without:content|file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480'
        ]);

        $post = new Post();
        $post->user_id = Auth::id();
        $post->title = $request->input('title');
        $post->content = $request->input('content');

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $path = $file->store('posts', 'public');
            $post->media_path = $path;
            
            $mime = $file->getMimeType();
            $post->media_type = str_starts_with($mime, 'video') ? 'video' : 'image';
        } else {
            $post->media_type = 'text';
        }

        $post->save();

        return response()->json([
            'status' => 'success',
            'data' => $post,
            'message' => 'Post créé avec succès'
        ], 201);
    }

    public function showMedia($filename)
    {
        $path = storage_path('app/public/posts/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path, [
            'Cache-Control' => 'public, max-age=31536000',
            'Content-Type' => mime_content_type($path),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required_without:media',
            'content' => 'required_without:media',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480'
        ]);

        $post->title = $request->input('title', $post->title);
        $post->content = $request->input('content', $post->content);

        if ($request->hasFile('media')) {
            // Supprimer l’ancien média si existant
            if ($post->media_path) {
                Storage::disk('public')->delete($post->media_path);
            }

            $file = $request->file('media');
            $path = $file->store('posts', 'public');
            $post->media_path = $path;
            $post->media_type = str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image';
        }

        $post->save();

        return response()->json([
            'status' => 'success',
            'data' => $post,
            'message' => 'Post modifié avec succès'
        ], 201);
    }

    public function destroy(Post $post)
    {
        if (Auth::id() !== $post->user_id) {
            abort(403);
        }

        if ($post->media_path) {
            Storage::disk('public')->delete($post->media_path);
        }

        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Post supprimé avec succès'
        ]);
    }
}
