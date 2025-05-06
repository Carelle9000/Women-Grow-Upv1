<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Notifications\NewLikeNotification;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Toggle a like for a post.
     */
    public function toggle(Request $request, Post $post)
    {
        $user = $request->user();
        $liked = $post->likes()->where('user_id', $user->id)->exists();

        if ($liked) {
            $post->likes()->where('user_id', $user->id)->delete();
        } else {
            $post->likes()->create(['user_id' => $user->id]);

            // Notify post owner if not the same user
            if ($post->user_id !== $user->id) {
                $post->user->notify(new NewLikeNotification($post, $user));
            }
        }

        return response()->json([
            'liked' => !$liked,
            'likes_count' => $post->likes()->count(),
        ]);
    }
}