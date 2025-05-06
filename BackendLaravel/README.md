Women Grow Up - Back-end README
Aperçu du projet
Women Grow Up est une plateforme sociale engagée pour l’autonomisation des femmes, offrant des ressources, des témoignages inspirants, et des opportunités de réseautage. Le back-end, construit avec Laravel, fournit une API RESTful robuste et sécurisée pour gérer les utilisateurs, les contenus (articles, témoignages, ressources), et les interactions communautaires. Ce README se concentre sur la configuration, l’architecture et le développement du back-end.
Technologies utilisées

Laravel (v10.x) : Framework PHP pour le développement de l’API.
MySQL : Base de données relationnelle pour stocker les données.
Laravel Sanctum : Gestion de l’authentification par tokens API.
Eloquent ORM : Gestion des relations et requêtes avec la base de données.
Laravel Artisan : Outil CLI pour les migrations, seeders, et autres tâches.
PHP (v8.2 ou supérieur) : Langage principal.
Composer : Gestion des dépendances PHP.
PHPUnit : Pour les tests unitaires et fonctionnels.

Prérequis
Avant de commencer, assurez-vous d’avoir les outils suivants installés :

PHP (v8.2 ou supérieur)
Composer (v2.x)
MySQL (v8.0 ou supérieur)
Node.js (optionnel, pour les assets si utilisés)
Un serveur local comme XAMPP, Laragon, ou Docker
Un éditeur de code comme Visual Studio Code

Installation

Cloner le dépôt :
git clone https://github.com/votre-organisation/women-grow-up.git
cd women-grow-up/backend


Installer les dépendances :
composer install


Configurer les variables d’environnement :

Copiez le fichier .env.example pour créer un fichier .env :cp .env.example .env


Configurez les paramètres dans .env, notamment :APP_NAME="Women Grow Up"
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=women_grow_up
DB_USERNAME=root
DB_PASSWORD=


Générez une clé d’application :php artisan key:generate




Configurer la base de données :

Créez une base de données MySQL nommée women_grow_up (ou selon votre configuration).
Exécutez les migrations pour créer les tables :php artisan migrate


(Optionnel) Remplissez la base avec des données de test :php artisan db:seed




Lancer le serveur :
php artisan serve

L’API sera accessible à http://localhost:8000.

(Optionnel) Configurer Sanctum pour l’API :

Publiez les fichiers de configuration de Sanctum :php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"


Assurez-vous que api est configuré dans .env pour les tokens.



Structure du projet
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # Contrôleurs API (Users, Resources, Testimonials)
│   │   ├── Middleware/        # Middleware personnalisés
│   │   └── Requests/          # Validation des requêtes
│   ├── Models/                # Modèles Eloquent (User, Resource, Testimonial)
│   └── Services/              # Logique métier (ex. ResourceService)
├── config/                    # Fichiers de configuration (Sanctum, database)
├── database/
│   ├── migrations/            # Fichiers de migration pour la base de données
│   └── seeders/               # Données de test
├── routes/
│   ├── api.php               # Routes de l’API
│   └── web.php               # Routes web (si utilisées)
├── tests/                     # Tests unitaires et fonctionnels
├── .env.example               # Exemple de fichier d’environnement
├── composer.json              # Dépendances et scripts
├── artisan                    # Commande Artisan
└── README.md                  # Ce fichier

Architecture du Back-end

Modèles : Les modèles Eloquent (User, Resource, Testimonial, etc.) gèrent les relations avec la base de données (ex. un utilisateur peut avoir plusieurs témoignages).
Contrôleurs : Les contrôleurs API (ResourceController, TestimonialController) traitent les requêtes CRUD et renvoient des réponses JSON.
Validation : Les FormRequest assurent la validation des données entrantes (ex. titre et contenu obligatoires pour une ressource).
Authentification : Laravel Sanctum fournit des tokens pour sécuriser les endpoints API, avec des middleware comme auth:sanctum.
Services : La logique métier est encapsulée dans des classes de service pour une meilleure maintenabilité (ex. ResourceService pour gérer la création/mise à jour des ressources).
Routes : Les routes API sont définies dans routes/api.php avec un préfixe /api (ex. GET /api/resources, POST /api/testimonials).
Sécurité : Conformité RGPD avec chiffrement des données sensibles et protection CSRF.

Scripts disponibles
Les commandes Artisan courantes incluent :

php artisan migrate : Exécute les migrations.
php artisan db:seed : Remplit la base de données avec des données de test.
php artisan serve : Lance le serveur de développement.
php artisan test : Exécute les tests avec PHPUnit.
php artisan optimize : Met en cache la configuration et les routes pour la production.

Dépendances principales
{
  "require": {
    "php": "^8.2",
    "laravel/framework": "^10.0",
    "laravel/sanctum": "^3.3",
    "spatie/laravel-permission": "^5.11"
  },
  "require-dev": {
    "phpunit/phpunit": "^10.0",
    "fakerphp/faker": "^1.23"
  }
}

Base de données
La base de données MySQL comprend les tables principales suivantes :

users : Informations des utilisatrices (nom, email, mot de passe).
resources : Ressources éducatives (titre, contenu, catégorie).
testimonials : Témoignages inspirants (auteur, contenu, date).
categories : Catégories pour organiser les ressources (ex. leadership, entrepreneuriat).
(Autres tables générées par Sanctum ou des packages comme spatie/laravel-permission pour les rôles.)

Exemple de migration pour resources :
Schema::create('resources', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('content');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('category_id')->constrained()->onDelete('cascade');
    $table->timestamps();
});

Tests
Les tests sont écrits avec PHPUnit et se trouvent dans le dossier tests. Pour exécuter les tests :
php artisan test

Exemple de test pour un endpoint API :
namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class ResourceTest extends TestCase
{
    public function test_can_create_resource()
    {
        Sanctum::actingAs($user = User::factory()->create());
        $response = $this->postJson('/api/resources', [
            'title' => 'New Resource',
            'content' => 'Content of the resource',
            'category_id' => 1,
        ]);
        $response->assertStatus(201);
        $this->assertDatabaseHas('resources', ['title' => 'New Resource']);
    }
}

Contribution

Forkez le dépôt.
Créez une branche pour votre fonctionnalité (git checkout -b feature/nom-fonctionnalite).
Commitez vos changements (git commit -m "Ajout de la fonctionnalité X").
Poussez votre branche (git push origin feature/nom-fonctionnalite).
Ouvrez une Pull Request.

Problèmes connus

Les performances des requêtes complexes (ex. recherche full-text) peuvent être optimisées avec un moteur comme Elasticsearch.
Les migrations doivent être testées en environnement de production pour éviter les conflits.

Déploiement
Pour déployer en production :

Configurez un serveur avec PHP, MySQL, et un serveur web (Nginx ou Apache).
Clonez le dépôt et installez les dépendances (composer install --optimize-autoloader).
Configurez .env avec les paramètres de production.
Exécutez php artisan migrate --force et php artisan optimize.
Configurez un reverse proxy pour l’API (ex. /api).

Contact
Pour toute question, contactez l’équipe à support@womengrowup.com.

Women Grow Up - Back-end README (Gestion des rôles User-Admin)
Aperçu du projet
Women Grow Up est une plateforme sociale pour l’autonomisation des femmes. Ce README détaille la configuration du back-end avec Laravel 12, la gestion des rôles User et Admin, et les étapes pour tester la logique métier. Il inclut des correctifs pour l’erreur "Too few arguments to function CheckRole::handle()".
Technologies utilisées

Laravel (v12.x)
MySQL : Base de données
Laravel Sanctum : Authentification par tokens
Eloquent ORM : Gestion des données
PHP (v8.2+)
Composer : Gestion des dépendances
PHPUnit : Tests

Prérequis

PHP (v8.2+)
Composer (v2.x)
MySQL (v8.0+)
Postman : Pour tester l’API
Node.js : Pour le frontend React

Installation

Cloner le dépôt :
git clone https://github.com/votre-organisation/women-grow-up.git
cd women-grow-up/backend


Installer les dépendances :
composer install


Configurer l’environnement :

Copiez .env.example :cp .env.example .env


Configurez .env :APP_URL=http://localhost:8000
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=women_grow_up
DB_USERNAME=root
DB_PASSWORD=
SANCTUM_STATEFUL_DOMAINS=localhost:5173


Générez la clé :php artisan key:generate




Configurer la base de données :

Créez une base de données women_grow_up.
Exécutez les migrations :php artisan migrate




Lancer le serveur :
php artisan serve



Gestion des rôles User-Admin
La logique métier repose sur :

Authentification : Via Laravel Sanctum avec tokens API.
Rôles : Champ role dans la table users (user ou admin).
Autorisation : Middleware CheckRole pour restreindre l’accès.

Structure des fichiers clés
app/
├── Http/
│   ├── Controllers/
│   │   ├── AuthController.php
│   │   └── AdminController.php
│   └── Middleware/
│       └── CheckRole.php
├── Models/
│   └── User.php
├── database/
│   └── migrations/
└── routes/
    └── api.php

Middleware CheckRole
Le middleware CheckRole vérifie le rôle de l’utilisateur :
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user() || $request->user()->role !== $role) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return $next($request);
    }
}

Correctif pour l’erreur "Too few arguments" :

Assurez-vous que le middleware est appliqué avec le paramètre role (ex. role:admin) dans routes/api.php :Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin/users', ...);



Tester la logique métier
Étape 1 : Créer des utilisateurs de test
php artisan tinker

App\Models\User::create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => Illuminate\Support\Facades\Hash::make('password'), 'role' => 'admin']);
App\Models\User::create(['name' => 'User', 'email' => 'user@example.com', 'password' => Illuminate\Support\Facades\Hash::make('password'), 'role' => 'user']);

Étape 2 : Tester avec Postman

POST /api/register :
{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password",
    "password_confirmation": "password",
    "role": "user"
}


Vérifiez la réponse (code 201, token inclus).


POST /api/login :
{
    "email": "admin@example.com",
    "password": "password"
}


Copiez le token.


GET /api/admin/users :

Ajoutez l’en-tête Authorization: Bearer <token>.
Attendu (admin) : Liste des utilisateurs.
Attendu (user) : {"message": "Unauthorized"} (code 403).


GET /api/user/profile :

Testez avec un token user pour voir le profil.



Étape 3 : Tester le frontend

Clonez le dépôt frontend (voir README précédent).
Lancez le frontend :npm run dev


Connectez-vous avec admin@example.com (mot de passe : password).
Accédez à /admin (tableau de bord admin).
Testez avec user@example.com et vérifiez la redirection vers /unauthorized si vous accédez à /admin.

Résolution des erreurs
Erreur : "Too few arguments to function CheckRole::handle()"

Cause : Le middleware role est appliqué sans paramètre (ex. 'role' au lieu de 'role:admin').
Solution :
Mettez à jour routes/api.php pour inclure le paramètre :Route::middleware(['auth:sanctum', 'role:admin'])->get('/admin/users', ...);


Effacez les caches :php artisan cache:clear
php artisan config:clear
php artisan route:clear





Autres erreurs 500 possibles

Logs : Vérifiez storage/logs/laravel.log :tail -f storage/logs/laravel.log


Base de données :php artisan db:connect


Sanctum :
Vérifiez SANCTUM_STATEFUL_DOMAINS=localhost:5173 dans .env.


Permissions :chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache



Contribution

Forkez le dépôt.
Créez une branche (git checkout -b fix/nom).
Commitez (git commit -m "Correction de X").
Poussez (git push origin fix/nom).
Ouvrez une Pull Request.

Contact
Pour toute question, contactez support@womengrowup.com.
