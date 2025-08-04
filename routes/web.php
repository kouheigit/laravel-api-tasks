<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskItemController;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('task-items', TaskItemController::class);
});
