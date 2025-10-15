<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostcardControllerV2;

// V2 API Routes
Route::prefix('v2')->middleware('auth:sanctum')->group(function () {
    // Postcard API
    Route::apiResource('postcards', PostcardControllerV2::class);
});

