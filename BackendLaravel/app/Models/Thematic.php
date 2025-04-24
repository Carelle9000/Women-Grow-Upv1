<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thematic extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'user_id',
        'slug',
        'is_open'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }

    public function scopeOpen($query)
    {
        return $query->where('is_open', true);
    
    }

    public function users()
{
    return $this->belongsToMany(User::class, 'thematic_user'); // table pivot
}

    
}