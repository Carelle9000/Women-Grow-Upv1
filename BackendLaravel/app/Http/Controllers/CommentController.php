<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;
use App\Notifications\NewCommentNotification;




class CommentController extends Controller
{
    //1- Faire un commentaire sur un post
    public function store(Request $request, Post $post)
 {
    $request->validate([
        'content' => 'required|string|max:1000',
    ]);

    $post->comments()->create([
        'content' => $request->content,
        'user_id' => auth()->id(),
    ]);

    
    // On crée le commentaire et on l'assigne à une variable
    $comment = $post->comments()->create([
        'content' => $request->input('content'),
        'user_id' => auth()->id(),
    ]);

    if ($post->user_id !== auth()->id()) {
        $post->user->notify(new NewCommentNotification($comment));
    }
    return response()->json([
        'comment' => $comment,
        'message' => 'commentaire cree avec succès'
    ]);
}

//2- Supprimer un commentaire
public function destroy(Comment $comment)
{
    if (auth()->id() !== $comment->user_id) {
        abort(403, 'Action non autorisée.');
    }

    $comment->delete();

    return response()->json([
        
        'message' => 'commentaire supprime avec succès'
    ]);}
// 3- Afficher les commentaires d'un post
public function show(Post $post)
{
    $comments = $post->comments()->with('user')->get();

    return response()->json([
        'success' => true,
        'comments' => $comments,
    ]);

}
// 4- Afficher les commentaires d'un utilisateur
public function showUserComments($userId)
{
    $comments = Comment::where('user_id', $userId)->with('post')->get();

    return response()->json([
        'comments' => $comments,
        'message' => 'Listes des commentaires  de cet utilisateur'
    ]);}
// 5- Mettre à jour un commentaire
public function update(Request $request, Comment $comment)
{
    if (auth()->id() !== $comment->user_id) {
        abort(403, 'Action non autorisée.');
    }

    $request->validate([
        'content' => 'required|string|max:1000',
    ]);

    $comment->update([
        'content' => $request->input('content'),
    ]);

    return response()->json([
        'comment' => $comment,
        'message' => 'commentaire modifie avec succès'
    ]);}
// 6- Afficher le formulaire d'édition d'un commentaire
public function edit(Comment $comment)
{
    // Vérifie que l'utilisateur est bien l'auteur du commentaire
    if (auth()->id() !== $comment->user_id) {
        abort(403, 'Accès non autorisé.');
    }

    return response()->json([
        'success' => true,
        'comment' => $comment,
        'message' => 'commentaire edite avec succès'
    ]);}
}