<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTodotestuRequest;
use App\Http\Requests\UpdateTodotestuRequest;
use App\Models\Todotestu;

class TodotestuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todotestus = Todotestu::query()
            ->latest()
            ->paginate(10);

        return view('todotestus.index', compact('todotestus'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('todotestus.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodotestuRequest $request)
    {
        $todotestu = Todotestu::create($request->validated());

        return redirect()
            ->route('todotestus.show', $todotestu)
            ->with('success', 'Todotestuを作成しました。');
    }

    /**
     * Display the specified resource.
     */
    public function show(Todotestu $todotestu)
    {
        return view('todotestus.show', compact('todotestu'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todotestu $todotestu)
    {
        return view('todotestus.edit', compact('todotestu'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodotestuRequest $request, Todotestu $todotestu)
    {
        $todotestu->update($request->validated());

        return redirect()
            ->route('todotestus.show', $todotestu)
            ->with('success', 'Todotestuを更新しました。');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todotestu $todotestu)
    {
        $todotestu->delete();

        return redirect()
            ->route('todotestus.index')
            ->with('success', 'Todotestuを削除しました。');
    }
}
