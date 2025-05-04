<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Api\CalendarController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\API\ReportController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MessageUserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\Api\ConversationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route pour la vérification de l'authentification
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});


//Routes pour l'authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::put('/users/{id}', [AuthController::class, 'update']);
Route::delete('/users/{id}', [AuthController::class, 'destroy']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
});

//Routes pour les posts
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::post('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::get('/posts/media/{filename}', [PostController::class, 'showMedia'])->name('posts.media');

});


// routes pour le calendrier

Route::middleware('auth:sanctum')->group(function () {

Route::get('/events', [CalendarController::class, 'index']);        // Lister
Route::post('/events', [CalendarController::class, 'store']);       // Créer
Route::get('/events/{event}', [CalendarController::class, 'show']); // Afficher
Route::post('/events/{event}', [CalendarController::class, 'update']); // Mettre à jour
Route::delete('/events/{event}', [CalendarController::class, 'destroy']); // Supprimer
Route::get('events/range/{start}/{end}', [CalendarController::class, 'getByRange']);
Route::apiResource('events', CalendarController::class)->except(['show']);
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
        Route::post('/forum/{thematic}/users', [ForumController::class, 'addUsers']);
        Route::delete('/{thematic}', [ForumController::class, 'destroy']);           // Supprimer un sujet    
         Route::put('/replies/{reply}', [ForumController::class, 'updateReply']);    // Modifier une réponse

    });
});

Route::middleware('auth:sanctum')->group(function () {
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');

    // Comments
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
    Route::get('/comments/{comment}/edit', [CommentController::class, 'edit'])->name('comments.edit');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});


// routes pour le formulaire de signalement


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reports', [ReportController::class, 'store']);
    Route::put('/reports/{report}', [ReportController::class, 'update']);
    Route::delete('/reports/{report}', [ReportController::class, 'destroy']);
});

Route::get('/reports', [ReportController::class, 'index']);
Route::get('/reports/{id}', [ReportController::class, 'show']);

// Routes pour le formulaire de contact
Route::post('/contact', [MessageController::class, 'store']);

//routes pour les conversations
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/conversations', [ConversationController::class, 'index'])->name('conversations.index');
    Route::post('/conversations', [ConversationController::class, 'store'])->name('conversations.store');
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show'])->name('conversations.show');
    Route::put('/conversations/{conversation}', [ConversationController::class, 'update'])->name('conversations.update');
    Route::delete('/conversations/{conversation}', [ConversationController::class, 'destroy'])->name('conversations.destroy');
});

// routes pour les messsages entre les utilisateurs
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/messages', [ConversationController::class, 'index']);
Route::get('/members', [MemberController::class, 'index']);
Route::post('/messages', [MessageUserController::class, 'storeChat']);
Route::get('/messages/{recipientId}', [MessageUserController::class, 'show']);
Route::post('/chat-messages', [MessageController::class, 'storeChatMessage']);
});

//routes pour les sessions
Route::get('/sessions', [SessionController::class, 'index'])->middleware('auth:sanctum');
