@extends('todo.layout')
@section('content')
    <h1>test</h1>
    <h1>Todoインデックスブレード</h1>
    <p>{{ Auth::guard('todo')->user()->name }} さんのタスク</p>
    <b>{{ Auth::guard('todo')->user()->name }}さんのタスク</b>

@endsection

