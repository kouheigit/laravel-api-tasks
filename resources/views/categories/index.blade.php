<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExpenseBoard カテゴリ一覧</title>
    <style>
        body {
            font-family: sans-serif;
            max-width: 960px;
            margin: 40px auto;
            padding: 0 16px;
            line-height: 1.6;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #d0d7de;
            padding: 10px;
            text-align: left;
        }
        th {
            background: #f6f8fa;
        }
        .actions {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
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
        .success, .error {
            padding: 12px;
            margin-bottom: 16px;
        }
        .success {
            background: #e6ffed;
            border: 1px solid #b7ebc6;
        }
        .error {
            background: #fff5f5;
            border: 1px solid #f1aeb5;
        }
    </style>
</head>
<body>
    <h1>ExpenseBoard カテゴリ一覧</h1>

    @if (session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

    @if (session('error'))
        <div class="error">{{ session('error') }}</div>
    @endif

    <p class="actions">
        <a href="{{ route('categories.create') }}" class="button-link">カテゴリを追加</a>
        <a href="{{ route('expenses.index') }}" class="button-link">支出一覧へ</a>
    </p>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>カテゴリ名</th>
                <th>支出件数</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($categories as $category)
                <tr>
                    <td>{{ $category->id }}</td>
                    <td>{{ $category->name }}</td>
                    <td>{{ $category->expenses_count }}</td>
                    <td>
                        <div class="actions">
                            <a href="{{ route('categories.show', $category) }}" class="button-link">詳細</a>
                            <a href="{{ route('categories.edit', $category) }}" class="button-link">編集</a>
                            <form action="{{ route('categories.destroy', $category) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" onclick="return confirm('このカテゴリを削除しますか？');">削除</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="4">カテゴリはまだ登録されていません。</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
