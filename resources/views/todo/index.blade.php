@extends('todo.layout')
@section('content')

    <h3>{{Auth::guard('todo')->user()->name }}さんの投稿データ</h3>
    @foreach($todos as $todo)
        <div style="border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 6px;">

            {{-- =======================基本情報 ======================= --}}
            <p><strong>タスクID：</strong> {{ $todo->id }}</p>
            <p><strong>ユーザーID：</strong> {{ $todo->todo_user_id }}</p>
            <p><strong>タイトル：</strong> {{ $todo->title }}</p>
            <p><strong>内容：</strong> {{ $todo->description }}</p>
            <p><strong>期限日時（RAW）：</strong> {{ $todo->due_date }}</p>

            <hr>

            {{-- =======================ID カラム（task 本体）======================= --}}
            <p><strong>ステータスID：</strong> {{ $todo->todo_status_id }}</p>
            <p><strong>優先度ID：</strong> {{ $todo->todo_priority_id }}</p>

            <hr>

            {{-- =======================リレーション：status / priority ※ with(['status:id,label','priority:id,label']) 必須======================= --}}
            {{--超重要、行の真ん中のstatus、priorityは参照してるテーブルを表示してる--}}
            <p><strong>ステータス名：</strong>
                {{ $todo->status->label }}（ID: {{ $todo->status->id }}）
            </p>

            <p><strong>優先度名：</strong>
                {{ $todo->priority->label }}（ID: {{ $todo->priority->id }}）
            </p>

            <hr>

            {{-- ======================= リレーション：user※ with('user') を使わないと N+1 発生======================= --}}
            <p><strong>ユーザーID：</strong> {{ $todo->user->id }}</p>
            <p><strong>ユーザー名：</strong> {{ $todo->user->name }}</p>
            <p><strong>ユーザーメール：</strong> {{ $todo->user->email }}</p>
            <hr>
        </div>
    @endforeach



