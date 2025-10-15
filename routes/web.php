<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskItemController;
use App\Http\Controllers\ApiAuthControllerV2;
use App\Http\Controllers\PostcardControllerV2;

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

