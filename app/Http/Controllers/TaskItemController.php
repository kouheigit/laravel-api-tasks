<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskItem;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskItemRequest;
use App\Http\Resources\TaskItemResource;
use Illuminate\Session\Store;


class TaskItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TaskItem::query();

        if ($request->filled('sort')) {
            $sortField = $request->input('sort');

        if (in_array($sortField, ['priority', 'due_date', 'created_at'])) {
            $query->orderBy($sortField, 'asc');
        }
    }
        $query->where('user_id',auth()->id());

        $taskItems = $query->paginate(10);

        return TaskItemResource::collection($taskItems);

    }

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
    public function show(TaskItem $taskItem)
    {
        $this->authorize('view',$taskItem);
        return new TaskItemResource($taskItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTaskItemRequest $request,TaskItem $taskItem)
    {
        $this->authorize('update', $taskItem);
        $validated = $request->validated();
        $taskItem->update($validated);

        return new TaskItemResource($taskItem);
    }

    public function destroy(TaskItem $taskItem)
    {
       $this->authorize('delete', $taskItem);
        $taskItem->delete();
        return response()->json(['message'=>'削除しました。'],200);
    }
}
