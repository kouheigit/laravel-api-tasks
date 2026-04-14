<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todotestu 一覧</title>
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
            vertical-align: top;
        }
        th {
            background: #f6f8fa;
        }
        .actions {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
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
        .success {
            padding: 12px;
            background: #e6ffed;
            border: 1px solid #b7ebc6;
            margin-bottom: 20px;
        }
        .pagination {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Todotestu 一覧</h1>

    @if (session('success'))
        <div class="success">
            {{ session('success') }}
        </div>
    @endif

    <p>
        <a href="{{ route('todotestus.create') }}" class="button-link">Todotestuを新規作成</a>
    </p>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>タイトル</th>
                <th>ステータス</th>
                <th>期限</th>
                <th>優先度</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($todotestus as $todotestu)
                <tr>
                    <td>{{ $todotestu->id }}</td>
                    <td>{{ $todotestu->title }}</td>
                    <td>{{ $todotestu->status }}</td>
                    <td>{{ $todotestu->due_date ?? '-' }}</td>
                    <td>{{ $todotestu->priority }}</td>
                    <td>
                        <div class="actions">
                            <a href="{{ route('todotestus.show', $todotestu) }}" class="button-link">詳細</a>
                            <a href="{{ route('todotestus.edit', $todotestu) }}" class="button-link">編集</a>
                            <form action="{{ route('todotestus.destroy', $todotestu) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" onclick="return confirm('このTodotestuを削除しますか？');">削除</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6">Todotestuはまだ登録されていません。</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div class="pagination">
        {{ $todotestus->links() }}
    </div>
</body>
</html>
