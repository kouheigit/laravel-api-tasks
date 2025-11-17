<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskItemController;
use App\Http\Controllers\ApiAuthControllerV2;
use App\Http\Controllers\PostcardControllerV2;
use App\Http\Controllers\TodoAuthController;


Route::get('/', function () {
    return view('welcome');
});
// TodoUser ログイン画面
Route::get('/todo/login', [TodoAuthController::class, 'showLoginForm'])
    ->name('todo.login');

// ログイン処理
Route::post('/todo/login', [TodoAuthController::class, 'login']);

// ログアウト
Route::post('/todo/logout', [TodoAuthController::class, 'logout'])
    ->name('todo.logout');


//ログイン後に使用できる
Route::middleware('auth:todo')->group(function () {

    // ダッシュボード
    Route::get('/todo/dashboard', function () {
        return view('todo.dashboard');
    })->name('todo.dashboard');

    // Todo の CRUD ルート一式
    Route::resource('todos', TodoController::class);
});

// ログイン後のページ（TodoUser 専用）
Route::middleware('auth:todo')->group(function () {
    Route::get('/todo/dashboard', function () {
        return view('todo.dashboard');
    })->name('todo.dashboard');
});




// SanctumのCSRFトークンルート
Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('task-items', TaskItemController::class);
});

Route::post('/v2/signup', [ApiAuthControllerV2::class, 'signup']);
Route::post('/v2/signin', [ApiAuthControllerV2::class, 'signin']);


Route::post('/signup', [AuthSessionController::class, 'register']);
Route::post('/signin', [AuthSessionController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/v2/me', [ApiAuthControllerV2::class, 'me']);
    Route::apiResource('v2/postcards', PostcardControllerV2::class);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/writer', fn() => auth()->user());
    Route::apiResource('articles', ArticleController::class);
});


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
