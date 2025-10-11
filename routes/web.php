<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskItemController;

Route::get('/', function () {
    return view('welcome');
});


// SanctumのCSRFトークンルート
Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('task-items', TaskItemController::class);
});

Route::post('/signup', [AuthSessionController::class, 'register']);
Route::post('/signin', [AuthSessionController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/writer', fn() => auth()->user());
    Route::apiResource('articles', ArticleController::class);
});
