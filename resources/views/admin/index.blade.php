@extends('admin.layout')
@section('content')
<h1>Admin 一覧</h1>
<p>
    {{Auth::guard('admin')->user()->name }}さんでログイン中
</p>
<p>ここに一覧を表示します</p>
@endsection
