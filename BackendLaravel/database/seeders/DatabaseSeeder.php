<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Appelle les seeders que tu as créés
        $this->call([
            // Liste tes autres seeders ici
            RoleSeeder::class, // Exemple de seeder pour la table 'users'
        ]);
    }
}
