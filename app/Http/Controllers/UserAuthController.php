<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email','password');

        if(!Auth::attempt($credentials)){
            return response()->json(['message'=>'認証に失敗しました'],401);

            $user = Auth::user();
            return response()->json($user);
        }
    }
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message'=>'ログアウトしました']);
    }
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}

