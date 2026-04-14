<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExpenseBoard カテゴリ編集</title>
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
        input {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            box-sizing: border-box;
        }
        .errors {
            padding: 12px;
            background: #fff5f5;
            border: 1px solid #f1aeb5;
            margin-bottom: 20px;
        }
        .actions {
            margin-top: 24px;
            display: flex;
            gap: 12px;
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
    </style>
</head>
<body>
    <h1>ExpenseBoard カテゴリ編集</h1>

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

    <form action="{{ route('categories.update', $category) }}" method="POST">
        @csrf
        @method('PUT')

        <label for="name">カテゴリ名</label>
        <input type="text" id="name" name="name" value="{{ old('name', $category->name) }}" maxlength="100" required>

        <div class="actions">
            <button type="submit">更新</button>
            <a href="{{ route('categories.index') }}" class="button-link">一覧へ戻る</a>
        </div>
    </form>
</body>
</html>
