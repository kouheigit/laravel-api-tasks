@extends('todo.layout')
@section('content')
<h1>Member　ダッシュボード</h1>
<p>
    {{Auth::guard('member')->user()->name }}さんでログイン中
</p>

<form method="POST" action="{{ route('pointleader.use')  }}">
    @csrf
    <input type="hidden" name="id" value=1>
    <input type="hidden" name="type" value=1>
    <input type="number" name="delta">
    <input type="text" name="memo">
    <button type="submit">付与する</button>
</form>


<form method="POST" action="{{route('member.logout')}}">
    @csrf
    <button type="submit">ログアウト</button>
</form>
@endsection


