@extends('todo.layout')
@section('content')
    <h1>TodoUser　ダッシュボード</h1>
    <p>
        {{Auth::guard('todo')->user()->name }}さんでログイン中
    </p>
    <form method="POST" action="{{route('todo.store')}}">
        @csrf
        <div>
            <label>タイトル：</label><br>
            <input type="text" name="title" value="{{ old('title') }}">
        </div>
        <div>
            <p><strong>ステータス:ID</strong></p>
            {{--
            <p><strong>ステータスID：</strong> {{ $todo->todo_status_id }}</p>
            <p><strong>優先度ID：</strong> {{ $todo->todo_priority_id }}</p>--}}
        </div>
        <div>
            <label>内容：</label>
            <textarea name="description">{{ old('description') }}</textarea>
        </div>
        <button type="submit">登録する</button>
    </form>
@endsection
