<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WorkController;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\TaskItemController;
use App\Http\Controllers\TaskItemV2Controller;
use App\Http\Controllers\TaskNoteController;
use App\Http\Controllers\ReviewController;
use App\Models\User;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\BookController;
// use Illuminate\Validation\Rules; // not used

// 非認証ルート
Route::post('/login', [UserAuthController::class, 'login']);

// Register endpoint
Route::post('/register', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
    ]);

    return response()->json(['message' => 'User registered successfully'], 201);
});


// 認証が必要なルート
Route::middleware('auth:sanctum')->group(function () {
    // ユーザー認証関連
    Route::get('/me', [UserAuthController::class, 'me']);
    Route::post('/logout', [UserAuthController::class, 'logout']);
    
    // 書籍管理
    Route::apiResource('books', BookController::class);
    
    // その他の既存API
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('works', WorkController::class);
    Route::apiResource('tasks', TaskController::class);
    Route::apiResource('task-items', TaskItemController::class);
    Route::apiResource('task-item-v2s', TaskItemV2Controller::class);
    Route::apiResource('reviews', ReviewController::class);
    Route::apiResource('task-notes', TaskNoteController::class);
});

// 非認証でもアクセス可能なルート
Route::get('/genres', [GenreController::class, 'index']);
/*
 * use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WorkController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ✅ worksルートをauth付きにする
    Route::apiResource('works', WorkController::class);

    // 必要であれば他の保護APIもここへ
    Route::apiResource('tasks', TaskController::class);
});
 */
