@extends('todo.layout')
@section('content')
    <h1>TodoUser　ダッシュボード</h1>
    <form method="POST" action="{{ route('todo.registration.store') }}">
        @csrf
        <div>
            <label>名前：</label><br>
            <input type="text" name="name" value="{{ old('name') }}">
        </div>
        <div>
            <label>e-mail：</label>
            <br>
            <input type="email" name="email" value="{{ old('email') }}">
        </div>
        <div>
            <label>password：</label>
            <br>
            <input type="password" name="password">
        </div>
        <button type="submit">登録する</button>
    </form>
@endsection
