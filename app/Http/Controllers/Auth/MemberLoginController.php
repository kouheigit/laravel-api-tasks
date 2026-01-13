<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class MemberLoginController extends Controller
{
    public function showLoginForm()
    {
        return view('member.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
           'email'=>['required','email'],
           'password'=>['required'],
        ]);

        if(Auth::guard('member')->attempt($credentials,$request->boolean('remember'))){
            $request->session()->regenerate();
            return redirect()->route('member.dashbord');
        }
        return back()->withErrors([
            'email'=>'メールアドレスまたはパスワードが正しくありません。'
        ]);
    }
    public function logout(Requst $request)
    {
        Auth::guard('member')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'ログアウトしました']);
    }
}
