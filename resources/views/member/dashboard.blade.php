@extends('todo.layout')
@section('content')
<h1>TodoUser　ダッシュボード</h1>
<p>
    {{Auth::guard('member')->user()->name }}さんでログイン中
</p>
<form method="POST" action="{{route('member.logout')}}">
    @csrf
    <button type="submit">ログアウト</button>
</form>
@endsection


