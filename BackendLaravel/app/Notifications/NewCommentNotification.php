<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewCommentNotification extends Notification
{
    use Queueable;
    public $comment;

    /**
     * Create a new notification instance.
     */
    public function __construct($comment)
    {
        $this->comment = $comment;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['database']; // ou ['mail', 'database'] si tu veux aussi par email
    }
     

    public function toDatabase($notifiable)
    {
        return [
            'post_id' => $this->comment->post->id,
            'post_title' => $this->comment->post->title,
            'comment_content' => $this->comment->content,
            'commented_by' => $this->comment->user->name,
        ];
    }
    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line("{$this->comment->user->name} a commenté votre post.")
            ->action('Voir le commentaire', url("/posts/{$this->comment->post->id}"));
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
