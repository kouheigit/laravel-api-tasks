<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostcardControllerV2;
use App\Http\Controllers\ApiAuthControllerV2;

// V2 API Routes - 非認証
Route::prefix('v2')->group(function () {
    Route::post('/signup', [ApiAuthControllerV2::class, 'signup']);
    Route::post('/signin', [ApiAuthControllerV2::class, 'signin']);
});

// V2 API Routes - 認証必須
Route::prefix('v2')->middleware('auth:sanctum')->group(function () {
    Route::get('/me', [ApiAuthControllerV2::class, 'me']);
    Route::apiResource('postcards', PostcardControllerV2::class);
});

