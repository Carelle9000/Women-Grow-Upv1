<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'media_path',
        'media_type'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Méthode pour déterminer si le post contient une image
    public function isImage()
    {
        return $this->media_type === 'image';
    }

    // Méthode pour déterminer si le post contient une vidéo
    public function isVideo()
    {
        return $this->media_type === 'video';
    }

    // Méthode pour déterminer si le post est uniquement du texte
    public function isText()
    {
        return $this->media_type === 'text';
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    
}