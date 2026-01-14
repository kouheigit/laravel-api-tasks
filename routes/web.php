<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskItemController;
use App\Http\Controllers\ApiAuthControllerV2;
use App\Http\Controllers\PostcardControllerV2;
use App\Http\Controllers\TodoAuthController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\Auth\MemberLoginController;


Route::get('/', function () {
    return view('welcome');
});
// TodoUser ログイン画面
Route::get('/todo/login', [TodoAuthController::class, 'showLoginForm'])
    ->name('todo.login');

// ログイン処理
Route::post('/todo/login', [TodoAuthController::class, 'login']);

// ログアウト
Route::post('/todo/logout', [TodoAuthController::class, 'logout'])
    ->name('todo.logout');

Route::get('/todo/registration', [TodoController::class, 'registration'])
    ->name('todo.registration');
Route::post('/todo/registration', [TodoController::class, 'registrationStore'])
    ->name('todo.registration.store');


Route::prefix('member')->name('member.')->group(function () {
    Route::get('login', [MemberLoginController::class, 'showLoginForm'])->name('login');
    Route::post('login', [MemberLoginController::class, 'login']);
    Route::post('logout', [MemberLoginController::class, 'logout'])->name('logout');
    Route::get('registration', [MemberLoginController::class, 'registration'])->name('registration');
    Route::post('registration', [MemberLoginController::class, 'registrationStore'])->name('registration.store');
    Route::middleware('auth:member')->group(function () {
        Route::get('dashboard', fn() => view('member.dashboard'))->name('dashboard');
    });
});

//admin
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [AdminLoginController::class, 'showLoginForm'])->name('login');
    Route::post('login', [AdminLoginController::class, 'login']);
    Route::post('logout', [AdminLoginController::class, 'logout'])->name('logout');
    Route::get('registration', [AdminLoginController::class, 'registration'])->name('registration');
    Route::post('registration', [AdminLoginController::class, 'registrationStore'])->name('registration.store');
    Route::middleware('auth:member')->group(function () {
        Route::get('dashboard', fn() => view('member.dashboard'))->name('dashboard');
    });
});



//ログイン後に使用できる
Route::middleware('auth:todo')->group(function () {

    // ダッシュボード
    Route::get('/todo/dashboard', function () {
        return view('todo.dashboard');
    })->name('todo.dashboard');

    Route::get('/todo/create', [TodoController::class, 'create'])
        ->name('todo.create');

    Route::post('/todo/store', [TodoController::class, 'store'])
        ->name('todo.store');


    Route::get('/todo/destroy', [TodoController::class, 'destroy'])
        ->name('todo. destroy');

    Route::resource('todo', TodoController::class);
});

// ログイン後のページ（TodoUser 専用）
Route::middleware('auth:todo')->group(function () {
    Route::get('/todo/dashboard', function () {
        return view('todo.dashboard');
    })->name('todo.dashboard');


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


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
