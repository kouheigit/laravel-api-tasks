<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Writer;
use Illuminate\Support\Facades\Hash;

class AuthSessionController extends Controller
{
    public function register(Request $request)
    {
         Writer::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
        ]);
        return response()->json(['message'=>'Writer registered']);
    }

    public function login(Request $request)
    {
        $writer = Writer::where('email',$request->email)->first();
        if(!$writer||!Hash::check($request->password,$writer->password)){
            return response()->json(['message'=>'Invalid credentials'],401);
        }
        $token = $writer->createToken('auth_token')->plainTextToken;

        return response()->json(['token'=>$token]);
    }
}

