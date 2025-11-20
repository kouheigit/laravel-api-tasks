<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TodoTasks;
use App\Models\TodoStatus;
use App\Models\TodoPriority;
use App\Http\Requests\TodoStoreRequest;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //user情報の取得
        $user = Auth::guard('todo')->user();
        // ★ N+1 を避けるために status と priority を with() で一括ロード
        $todos = TodoTasks::with(['status:id,label', 'priority:id,label'])
            ->where('todo_user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return view('todo.index',compact('todos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    //createメソッド
    public function create()
    {
        // ステータスと優先度のマスタ（お手本）を取得
        $statuses = TodoStatus::orderBy('id')->get();
        $priorities = TodoPriority::orderBy('id')->get();

        return view('todo.create',compact('statuses','priorities'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoStoreRequest $request)
    {
        $user = Auth::guard('todo')->user();

        TodoTasks::create([
           'todo_user_id'=>$user->id,
            'title'=>$request->title,
            'description'=>$request->description,
            'todo_status_id'    => $request->todo_status_id,
            'todo_priority_id'  => $request->todo_priority_id,
        ]);
        return redirect()->route('todo.index');
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
    public function destroy(string $todo)
    {
      
    }
}
