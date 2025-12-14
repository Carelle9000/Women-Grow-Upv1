<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\CalendarController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MessageUserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Routes pour l'authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'index']);
    Route::get('/me', [AuthController::class, 'me']); // Récupérer l'utilisateur authentifié
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/users/{id}', [AuthController::class, 'update']);
    Route::delete('/users/{id}', [AuthController::class, 'destroy']);
});

//Routes pour les posts
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::post('/posts/{post}', [PostController::class, 'update']); // Correction: POST pour update avec form-data
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::get('/posts/media/{filename}', [PostController::class, 'showMedia'])->name('posts.media');

    // Likes pour les posts
    Route::post('/posts/{post}/like', [LikeController::class, 'toggle']);

    // Commentaires
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::get('/posts/{post}/comments', [CommentController::class, 'show'])->name('comments.show');
    Route::get('/comments/{comment}/edit', [CommentController::class, 'edit'])->name('comments.edit');
    Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

// Routes pour le calendrier
Route::middleware('auth:sanctum')->group(function () {
    // La route pour getByRange doit être définie avant apiResource pour être correctement interceptée.
    Route::get('events/range/{start}/{end}', [CalendarController::class, 'getByRange']);
    Route::apiResource('events', CalendarController::class);
});

//Routes pour le forum
Route::prefix('forum')->group(function () {
    // Routes publiques
    Route::get('/', [ForumController::class, 'index']);
    Route::get('/{thematic:slug}', [ForumController::class, 'show']);
    
    // Routes protégées
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/', [ForumController::class, 'store']);
        Route::post('/{thematic}/close', [ForumController::class, 'close']);
        Route::post('/{slug}/replies', [ForumController::class, 'storeReplyBySlug']);
        Route::post('/{thematic}/users', [ForumController::class, 'addUsers']);
        Route::delete('/{thematic}', [ForumController::class, 'destroy']); // Supprimer un sujet
        Route::put('/replies/{reply}', [ForumController::class, 'updateReply']); // Modifier une réponse
    });
});

Route::middleware('auth:sanctum')->group(function () {
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
});

// routes pour le formulaire de signalement
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reports', [ReportController::class, 'store']);
    Route::put('/reports/{report}', [ReportController::class, 'update']);
    Route::delete('/reports/{report}', [ReportController::class, 'destroy']);
});

Route::get('/reports', [ReportController::class, 'index']);
Route::get('/reports/{id}', [ReportController::class, 'show']);

// Route pour le formulaire de contact (publique)
Route::post('/contact', [MessageController::class, 'storeContact']);

//routes pour les conversations
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations.index');
    Route::post('/conversations', [ConversationController::class, 'store'])->name('conversations.store');
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show'])->name('conversations.show');
    Route::post('/conversations/{conversation}', [ConversationController::class, 'update'])->name('conversations.update'); // POST pour les mises à jour avec form-data
    Route::delete('/conversations/{conversation}', [ConversationController::class, 'destroy'])->name('conversations.destroy');
});

// routes pour les messages entre les utilisateurs
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/members', [MemberController::class, 'index']);
    Route::post('/messages', [MessageUserController::class, 'storeChat']); // Utilise MessageUserController
    Route::get('/messages/{recipientId}', [MessageUserController::class, 'show']); // Utilise MessageUserController
    Route::get('/messages/unread-count', [MessageController::class, 'unreadCount']); // Reste dans MessageController
});

//routes pour les sessions
Route::get('/sessions', [SessionController::class, 'index'])->middleware('auth:sanctum');