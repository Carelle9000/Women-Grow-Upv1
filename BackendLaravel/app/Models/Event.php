<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
   // app/Models/Event.php
protected $fillable = [
    'user_id', 
    'title', 
    'description', 
    'start', 
    'end', 
    'color'
];

protected $dates = [
    'start',
    'end',
    'created_at', 
    'updated_at'
];

protected $casts = [
    'start' => 'datetime:Y-m-d H:i:s',
    'end' => 'datetime:Y-m-d H:i:s',
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
