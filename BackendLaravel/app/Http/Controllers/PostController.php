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
        return response()->json(Post::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required_without:media',
            'content' => 'required_without:media',
        
            'media' => 'required_without:content|file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480' // 20MB max
        ]);

        $post = new Post();
        $post->user_id = Auth::id();
        $post->content = $request->content;

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $path = $file->store('public/posts');
            
            $post->media_path = Storage::url($path);
            
            // Déterminer le type de média
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
        ], 201);    }

    public function destroy(Post $post)
    {
        // Vérifier que l'utilisateur est bien l'auteur du post
        if (Auth::id() !== $post->user_id) {
            abort(403);
        }

        // Supprimer le fichier média si nécessaire
        if ($post->media_path) {
            $path = str_replace('/storage', 'public', $post->media_path);
            Storage::delete($path);
        }

        $post->delete();

        return back()->with('success', 'Post supprimé avec succès!');
    }

        public function showMedia($filename)
    {
        $path = storage_path('app/public/posts/' . $filename);
        
        // Vérifier que le fichier existe
        if (!file_exists($path)) {
            abort(404);
        }
        

        return response()->file($path, [
            'Cache-Control' => 'public, max-age=31536000', // Cache 1 an
            'Content-Type' => mime_content_type($path),
        ]);
    }

        public function update(Request $request, Post $post)
    {
        // Validation simple sans vérification de permission
        $request->validate([
            'title' => 'required_without:media',
            'content' => 'required_without:media',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,mp4,mov,avi|max:20480'
        ]);

        // Mise à jour du contenu
        $post->content = $request->input('content', $post->content);
        $post->title = $request->input('title', $post->title);
        // Gestion du média
        if ($request->hasFile('media')) {
            // Suppression ancien média
            if ($post->media_path) {
                Storage::delete('public/'.$post->media_path);
            }

            // Enregistrement nouveau média
            $file = $request->file('media');
            $path = $file->store('posts', 'public');
            
            $post->media_path = $path;
            $post->media_type = str_starts_with($file->getMimeType(), 'video') ? 'video' : 'image';
        }

        $post->save();

        return response()->json([
            'status' => 'success',
            'data' => $post,
            'message' => 'Post modifie avec succès'
        ], 201);    
    }


}