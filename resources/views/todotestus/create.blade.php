<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todotestu 作成</title>
    <style>
        body {
            font-family: sans-serif;
            max-width: 760px;
            margin: 40px auto;
            padding: 0 16px;
            line-height: 1.6;
        }
        label {
            display: block;
            margin-top: 16px;
            font-weight: bold;
        }
        input, textarea, select {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            box-sizing: border-box;
        }
        .actions {
            margin-top: 24px;
            display: flex;
            gap: 12px;
            align-items: center;
        }
        .button-link,
        button {
            display: inline-block;
            padding: 8px 12px;
            border: 1px solid #333;
            background: #fff;
            color: #111;
            text-decoration: none;
            cursor: pointer;
        }
        .errors {
            padding: 12px;
            background: #fff5f5;
            border: 1px solid #f1aeb5;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Todotestu 作成</h1>

    @if ($errors->any())
        <div class="errors">
            <strong>入力内容を確認してください。</strong>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('todotestus.store') }}" method="POST">
        @csrf

        <label for="title">タイトル</label>
        <input type="text" id="title" name="title" value="{{ old('title') }}" maxlength="255" required>

        <label for="content">内容</label>
        <textarea id="content" name="content" rows="5">{{ old('content') }}</textarea>

        <label for="status">ステータス</label>
        <select id="status" name="status" required>
            <option value="pending" @selected(old('status', 'pending') === 'pending')>pending</option>
            <option value="doing" @selected(old('status') === 'doing')>doing</option>
            <option value="done" @selected(old('status') === 'done')>done</option>
        </select>

        <label for="due_date">期限</label>
        <input type="date" id="due_date" name="due_date" value="{{ old('due_date') }}">

        <label for="priority">優先度</label>
        <input type="number" id="priority" name="priority" value="{{ old('priority', 0) }}" min="0" max="5" required>

        <div class="actions">
            <button type="submit">作成</button>
            <a href="{{ route('todotestus.index') }}" class="button-link">一覧へ戻る</a>
        </div>
    </form>
</body>
</html>
