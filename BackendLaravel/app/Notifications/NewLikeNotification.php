<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Post;
use App\Models\User;

class NewLikeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $post;
    protected $user;

    public function __construct(Post $post, User $user)
    {
        $this->post = $post;
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Nouveau Like sur votre article')
            ->line("{$this->user->name} a aimé votre article: {$this->post->title}")
            ->action('Voir l\'article', url('/posts/' . $this->post->id))
            ->line('Merci de partager votre contenu !');
    }

    public function toArray($notifiable)
    {
        return [
            'post_id' => $this->post->id,
            'post_title' => $this->post->title,
            'user_id' => $this->user->id,
            'user_name' => $this->user->name,
        ];
    }
}