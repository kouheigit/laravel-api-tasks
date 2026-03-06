<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SevenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $message = 'テスト';
        $message1 = 'テスト1';
        return view('Seven.index',compact('message','message1'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /*
        $number = $request->input('number');

        return 'SevenController@store で受け取った値: ' . $number;*/
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
