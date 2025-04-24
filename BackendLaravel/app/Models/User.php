<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'prenom',
        'nom',
        'email',
        'telephone',
        'adresse',
        'ville',
        'age',
        'pays',
        'role_id',
        'photo',
        'password',

    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    
    public function hasRole($roleName)
    {
        return $this->role->name === $roleName;
    }
    public function events()
    {
        return $this->hasMany(Event::class);
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }


}