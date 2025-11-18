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
        <button type="submit">登録する</button>
    </form>
@endsection
