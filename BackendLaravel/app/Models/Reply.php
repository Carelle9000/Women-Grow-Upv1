<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = [
        'content', 'thematic_id', 'user_id', 'parent_id', 'edited_at',
    ];

    protected $casts = [
        'edited_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function thematic(): BelongsTo
    {
        return $this->belongsTo(Thematic::class);
    }

    /**
     * Définit la relation des enfants directs.
     * Cette relation n'est volontairement PAS récursive pour éviter les problèmes de performance sur les listes.
     */
    public function children(): HasMany
    {
        return $this->hasMany(Reply::class, 'parent_id');
    }

    /**
     * Définit la relation pour charger tous les enfants de manière récursive.
     * À n'utiliser QUE pour charger l'arborescence complète d'un seul élément.
     */
    public function childrenRecursive(): HasMany
    {
        return $this->children()->with('user', 'childrenRecursive');
    }
}