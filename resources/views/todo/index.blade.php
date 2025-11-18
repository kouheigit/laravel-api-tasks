@extends('todo.layout')
@section('content')

    <h1>test</h1>
    <h1>Todoインデックスブレード</h1>
    @foreach($todos as $todo)


         {{ $todo->todo_user_id }}
         {{ $todo->id }}   {{--タスクID--}}
         {{ $todo->todo_user_id }} {{-- ユーザーID--}}
         {{ $todo->title }} {{-- タイトル--}}
         {{ $todo->description }} {{-- 説明（nullable）--}}
         {{ $todo->due_date }} {{-- 期限日時（nullable）--}}

         {{ $todo->due_date }} {{-- 期限日時（nullable）--}}
         {{-- =======================
       基本情報
   ======================= --}}
         タイトル：{{ $todo->title }}
         内容：{{ $todo->description }}

         {{-- =======================
             ID カラム（task 本体）
         ======================= --}}
         ステータスID：{{ $todo->todo_status_id }}
         優先度ID：{{ $todo->todo_priority_id }}

         {{-- =======================
             リレーション値（status / priority）
             ※ with(['status:id,label','priority:id,label']) で読み込み済み
         ======================= --}}
         ステータス名：{{ $todo->status->label }}（ID: {{ $todo->status->id }}）
         優先度名：{{ $todo->priority->label }}（ID: {{ $todo->priority->id }}）

         {{-- =======================
             ユーザー情報（user リレーション）
             ※ with('user') を使わないと N+1 が起きる
         ======================= --}}
         ユーザーID：{{ $todo->user->id }}
         ユーザー名：{{ $todo->user->name }}
         ユーザーメール：{{ $todo->user->email }}

         {{-- =======================
             日付・日時（RAW 値）
         ======================= --}}
         作成日時RAW：{{ $todo->created_at }}
         更新日時RAW：{{ $todo->updated_at }}
         期限日時RAW：{{ $todo->due_date }}

         {{-- =======================
             日付フォーマット済み
         ======================= --}}
         作成日時：{{ $todo->created_at->format('Y-m-d H:i:s') }}
         作成日（日本語）：{{ $todo->created_at->format('Y年m月d日') }}
         更新日時：{{ $todo->updated_at->format('Y-m-d H:i:s') }}
         期限日時：{{ $todo->due_date?->format('Y-m-d H:i:s') ?? '未設定' }}
         期限日（日本語）：{{ $todo->due_date?->format('Y年m月d日') ?? '未設定' }}

         {{-- =======================
             相対日時（diffForHumans）
         ======================= --}}
         作成から：{{ $todo->created_at->diffForHumans() }}
         更新から：{{ $todo->updated_at->diffForHumans() }}

    @endforeach



