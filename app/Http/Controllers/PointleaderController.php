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
    //ポイント使用メソット(memberだけ利用できるメソット)
    public function use(Request $request)
    {
        
        /*operation_key	UNIQUE（冪等）はバックエンドの方で*/
    }
}
