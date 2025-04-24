<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'thematic_id',
        'user_id',
        'parent_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function thematic()
    {
        return $this->belongsTo(Thematic::class);
    }

    public function parent()
    {
        return $this->belongsTo(Reply::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Reply::class, 'parent_id');
    }
}