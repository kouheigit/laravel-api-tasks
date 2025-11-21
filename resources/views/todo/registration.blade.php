@extends('todo.layout')
@section('content')
    <h1>TodoUser　ダッシュボード</h1>
    <div>
        <label>タイトル：</label><br>
        <input type="name" name="name" value="{{ old('name') }}">
    </div>
    <div>
        <label>e-mail：</label>
        <br>
        <input type="email" name="email" value="{{ old('email') }}">
    </div>
    <div>
        <label>password：</label>
        <br>
        <input type="password" name="password" value="{{ old('password') }}">
    </div>
    <button type="submit">登録する</button>
    </form>
@endsection
