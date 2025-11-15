<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoAuthController extends Controller
{
    public function showLoginForm()
    {
        return view('todo.login');
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
           'email'=>['required','email'],
           'password'=>['required'],
        ]);
        if(Auth::guard('todo')->attempt($credentials,$request->boolean('remember'))){
            $request->session()->regenerate();
            return redirect()->route('todo.dashbord');
        }
        return back()->withErrors([
           'email'=>'メールアドレスまたはパスワードが正しくありません。'
        ]);

    }
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message'=>'ログアウトしました']);
    }
}
