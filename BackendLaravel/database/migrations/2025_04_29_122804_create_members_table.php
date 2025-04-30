<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('join_date'); // e.g., "Avril 2025"
            $table->string('role'); // e.g., "Administrateur", "Modérateur", "Membre"
            $table->boolean('online')->default(false);
            $table->string('color')->nullable(); // e.g., "bg-blue-500"
            $table->integer('topics')->default(0);
            $table->integer('messages')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
