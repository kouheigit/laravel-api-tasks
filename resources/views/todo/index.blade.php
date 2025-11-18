@extends('todo.layout')
@section('content')

    <h1>test</h1>
    <h1>Todoインデックスブレード</h1>
    @foreach($todos as $todo)


         {{ $todo->todo_user_id }}
         {{ $todo->id }}   {{--タスクID--}}
         {{ $todo->todo_user_id }} {{-- ユーザーID--}}
         {{ $todo->title }} {{-- タイトル--}}
         {{ $todo->description }} - 説明（nullable）
         {{ $todo->due_date }} - 期限日時（nullable）
       
    @endforeach



