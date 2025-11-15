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
    public function login(Request $reqest)
    {
        
    }
}
