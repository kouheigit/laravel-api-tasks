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


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ✅ worksルートをauth付きにする
    Route::apiResource('works', WorkController::class);

    // 必要であれば他の保護APIもここへ
    Route::apiResource('tasks', TaskController::class);
    Route::apiResource('task-items', TaskItemController::class);
    Route::apiResource('task-item-v2s', TaskItemV2Controller::class);

});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('reviews', ReviewController::class);
    Route::apiResource('task-notes', TaskNoteController::class);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserAuthController::class, 'me']);
    Route::post('/logout', [UserAuthController::class, 'logout']);
    Route::apiResource('books', BookController::class);
});

Route::post('/login', [UserAuthController::class, 'login']);
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
