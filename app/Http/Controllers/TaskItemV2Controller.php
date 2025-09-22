<?php

namespace App\Http\Controllers;

use App\Models\TaskItemV2;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskItemV2Request;
use App\Http\Requests\UpdateTaskItemV2Request;
use App\Http\Resources\TaskItemV2Resource;

class TaskItemV2Controller extends Controller
{
    public function index(Request $request)
    {
        $query = TaskItemV2::query();

        if ($request->filled('sort')) {
            $sortField = $request->input('sort');
            if (in_array($sortField, ['priority', 'due_date', 'created_at'])) {
                $query->orderBy($sortField, 'asc');
            }
        }

        $query->where('user_id', auth()->id());

        $taskItems = $query->paginate(10);
        return TaskItemV2Resource::collection($taskItems);
    }

    public function store(StoreTaskItemV2Request $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $taskItem = TaskItemV2::create($validated);
        return new TaskItemV2Resource($taskItem);
    }

    public function show(TaskItemV2 $taskItemV2)
    {
        return new TaskItemV2Resource($taskItemV2);
    }

    public function update(UpdateTaskItemV2Request $request, TaskItemV2 $taskItemV2)
    {
        $validated = $request->validated();
        $taskItemV2->update($validated);
        return new TaskItemV2Resource($taskItemV2);
    }

    public function destroy(TaskItemV2 $taskItemV2)
    {
        $taskItemV2->delete();
        return response()->json(['message' => '削除しました。'], 200);
    }
}


