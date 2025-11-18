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

            {{-- =======================
                日付（RAW）
            ======================= --}}
            <p><strong>作成日時RAW：</strong> {{ $todo->created_at }}</p>
            <p><strong>更新日時RAW：</strong> {{ $todo->updated_at }}</p>
            <p><strong>期限日時RAW：</strong> {{ $todo->due_date }}</p>

            <hr>

            {{-- =======================
                日付：フォーマット済み
            ======================= --}}
            <p><strong>作成日時：</strong> {{ $todo->created_at->format('Y-m-d H:i:s') }}</p>
            <p><strong>作成日（日本語）：</strong> {{ $todo->created_at->format('Y年m月d日') }}</p>
            <p><strong>更新日時：</strong> {{ $todo->updated_at->format('Y-m-d H:i:s') }}</p>
            <p><strong>期限日時：</strong>
                {{ $todo->due_date?->format('Y-m-d H:i:s') ?? '未設定' }}
            </p>
            <p><strong>期限日（日本語）：</strong>
                {{ $todo->due_date?->format('Y年m月d日') ?? '未設定' }}
            </p>

            <hr>

            {{-- =======================
                相対日時（diffForHumans）
            ======================= --}}
            <p><strong>作成から：</strong> {{ $todo->created_at->diffForHumans() }}</p>
            <p><strong>更新から：</strong> {{ $todo->updated_at->diffForHumans() }}</p>

        </div>
    @endforeach



