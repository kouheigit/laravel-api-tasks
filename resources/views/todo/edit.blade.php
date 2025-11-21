@extends('todo.layout')
@section('content')
    <h1>TodoUser　ダッシュボード</h1>
    <p>
        {{Auth::guard('todo')->user()->name }}さんでログイン中
    </p>
    <form method="POST" action="{{route('todo.update', $todo)}}">
        @csrf
        @method('PUT')
        <div>
            {{-- ステータス --}}
            <div>
                <label>ステータス：</label><br>
                <select name="todo_status_id">
                    @foreach ($statuses as $status)
                        <option value="{{ $status->id }}"
                            @selected(old('todo_status_id', $todo->todo_status_id) == $status->id)>
                            {{ $status->label }}
                        </option>
                    @endforeach
                </select>
            </div>

        {{-- 優先度 --}}
        <div>
            <label>優先度:</label>
            <select name="todo_priority_id">
                @foreach($priorities as $priority)
                    <option value="{{$priority->id }}"
                        @selected(old('todo_priority_id', $todo->todo_priority_id) == $priority->id)>
                        {{ $priority->label }}
                    </option>
                @endforeach
            </select>
        </div>

        <div>
            <label>タイトル：</label><br>
            <input type="text" name="title" value="{{ old('title',$todo->title) }}">
        </div>
        <div>
            <label>内容：</label>
            <br>
            <textarea name="description">{{ old('description',$todo->description) }}</textarea>
        </div>
            <button type="submit">更新する</button>
        </div>
    </form>
@endsection
