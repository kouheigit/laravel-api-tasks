<?php

namespace App\Http\Controllers;

use App\Models\SevenProduct;
use Illuminate\Http\Request;

class SevenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sevenProducts = SevenProduct::orderBy('id')->get();

        return view('Seven.index', compact('sevenProducts'));
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
        $number = $request->input('number'); // 今は常に「1」が来る想定
        $current = $request->session()->get('number', '');
        $next = $current.$number;

        return redirect()->route('seven.index')->with('number', $next);*/
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
