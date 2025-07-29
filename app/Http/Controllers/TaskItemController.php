<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskItemRequest;
use App\Http\Resources\TaskItemResource;
use App\Models\TaskItem;

class TaskItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskItemRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $taskItem = TaskItem::create($validated);
        return new TaskItemResource($taskItem);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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
