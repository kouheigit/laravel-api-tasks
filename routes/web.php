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
