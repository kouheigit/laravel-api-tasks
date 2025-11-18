@extends('todo.layout')
@section('content')
    <h1>TodoUser　ダッシュボード</h1>
    <p>
        {{Auth::guard('todo')->user()->name }}さんでログイン中
    </p>
    <form method="POST" action="{{route('todo.store')}}">
        @csrf
        <button type="submit">登録する</button>
    </form>
@endsection
