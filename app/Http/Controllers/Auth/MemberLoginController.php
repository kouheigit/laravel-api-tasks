<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Member;

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
            return redirect()->route('member.dashboard');
        }
        return back()->withErrors([
            'email'=>'メールアドレスまたはパスワードが正しくありません。'
        ]);
    }
    public function logout(Request $request)
    {
        Auth::guard('member')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'ログアウトしました']);
    }

    public function registration(Request $request)
    {
        return view('member.registration');
    }

    public function registrationStore(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:members,email'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        Member::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('member.login');
    }
}
