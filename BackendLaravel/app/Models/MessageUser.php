<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class MessageUser extends Model
{
    use HasFactory;
    protected $fillable = [
        'sender_id',
        'recipient_id',
        'content',
        'timestamp',
    ];

    protected $casts = [
        'timestamp' => 'datetime',
    ];
}
