<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TaskNote;
use App\Http\Resources\TaskNoteResource;
use App\Http\Requests\StoreTaskNoteRequest;
use App\Http\Requests\UpdateTaskNoteRequest;

class TaskNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = TaskNote::where('user_id',auth()->id());
        if($request->filled('sort')&& in_array($request->sort,['priority','due_date','created_at'])){
            $query->orderBy($request->sort,'asc');
        }
        return TaskNoteResource::collection($query->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskNoteRequest $request)
    {
        $this->authorize('create',TaskNote::class);
        $note = TaskNote::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
        ]);
        return new TaskNoteResource($note);
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskNote $taskNote)
    {
        $this->authorize('views',$taskNote);
        return new TaskNoteResource($taskNote);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskNoteRequest $request, TaskNote $taskNote)
    {
        $this->autorize('update',$taskNote);
        $taskNote->update($request->validate());
        return new TaskNoteResource($taskNote);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskNote $taskNote)
    {
        $this->authorize('delete',$taskNote);
        $taskNote->delete();
        return response()->noContent();
    }
}
