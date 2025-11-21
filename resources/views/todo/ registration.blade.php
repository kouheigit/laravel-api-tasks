@extends('todo.layout')
@section('content')
    <h1>TodoUser　ダッシュボード</h1>
    <p>
        {{Auth::guard('todo')->user()->name }}さんでログイン中
    </p>
    <form method="POST" action="{{route('todo.store')}}">
        @csrf
        <div>
            <label>ステータス:</label><br>
            <select name="todo_status_id">
                @foreach($statuses as $status)
                    <option value="{{$status->id }}">
                        {{$status->label}}
                    </option>
                @endforeach
            </select>
        </div>

        {{-- 優先度 --}}
        <div>
            <label>優先度:</label>
            <select name="todo_priority_id">
                @foreach($priorities as $priority)
                    <option value="{{$priority->id }}">
                        {{$priority->label}}
                    </option>
                @endforeach
            </select>
        </div>
        <div>
            <label>タイトル：</label><br>
            <input type="text" name="title" value="{{ old('title') }}">
        </div>
        <div>
            <label>内容：</label>
            <br>
            <textarea name="description">{{ old('description') }}</textarea>
        </div>
        <button type="submit">登録する</button>
    </form>
@endsection
