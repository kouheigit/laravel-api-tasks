<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WorkController;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\GenreController;
use App\Models\User;

Route::middleware('auth:sanctum')->get('/genres', [GenreController::class, 'index']);
//仮追記
Route::post('/login', function (Request $request) {
    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json(['token' => $token]);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ✅ worksルートをauth付きにする
    Route::apiResource('works', WorkController::class);

    // 必要であれば他の保護APIもここへ
    Route::apiResource('tasks', TaskController::class);

});



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
