<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
//追加した
Route::apiResource('works', WorkController::class);
Route::apiResource('tasks', TaskController::class);
