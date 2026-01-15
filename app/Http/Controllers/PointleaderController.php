<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PointleaderController extends Controller
{
    //管理者であるuserメソットのみ使用できる
    public function grant(Request $request)
    {
       //
    }
    //ポイント使用メソット(user以外のmemberだけ利用できるメソット)
    public function get(Request $request)
    {
        $user = Auth::user();
    }
}
