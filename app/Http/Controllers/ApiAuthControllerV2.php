<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ScribeAccount;
use Illuminate\Support\Facades\Hash;

class ApiAuthControllerV2 extends Controller
{
    public function signup(Request $request){

        $validated = $request->validate([
            'name'=>['required','string','max:100'],
            'email'=>['required','string','max:255','unique:scribe_accounts,email'],
            'password'=>['required','string','min:8'],
        ]);
        $scribe = ScribeAccount::create([
            'name'=>$validated['name'],
            'email'=>$validated['email'],
            'password'=>Hash::make($validated['password']),
        ]);

        return response()->json([
            'message'=>'ScribeAccount registred',
            'id'=>$scribe->id,
        ],201);

    }
    public function signin(Request $request){
        $validated = $request->validate([
           'email'=>['required','email'],
           'password'=>['required','string'],
        ]);

        $scribe = ScribeAccount::where('email',$validated['email'])->first();

        if(!$scribe||!Hash::check($validated['password'],$scribe->password)){
            return response()->json(['message'=>'Invalid credentials'],401);
        }
        $token = $scribe->createToken('api_v2_token')->plainTextToken;
        return response()->json(['token'=>$token],200);
    }

    public function me(Request $request){
        return $request->user();
    }
}
