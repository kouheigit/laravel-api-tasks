<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todotestu 詳細</title>
    <style>
        body {
            font-family: sans-serif;
            max-width: 760px;
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
            width: 180px;
            background: #f6f8fa;
        }
        .actions {
            margin-top: 24px;
            display: flex;
            gap: 12px;
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
    </style>
</head>
<body>
    <h1>Todotestu 詳細</h1>

    @if (session('success'))
        <div class="success">
            {{ session('success') }}
        </div>
    @endif

    <table>
        <tr>
            <th>ID</th>
            <td>{{ $todotestu->id }}</td>
        </tr>
        <tr>
            <th>タイトル</th>
            <td>{{ $todotestu->title }}</td>
        </tr>
        <tr>
            <th>内容</th>
            <td>{{ $todotestu->content ?: '-' }}</td>
        </tr>
        <tr>
            <th>ステータス</th>
            <td>{{ $todotestu->status }}</td>
        </tr>
        <tr>
            <th>期限</th>
            <td>{{ $todotestu->due_date ?? '-' }}</td>
        </tr>
        <tr>
            <th>優先度</th>
            <td>{{ $todotestu->priority }}</td>
        </tr>
        <tr>
            <th>作成日時</th>
            <td>{{ $todotestu->created_at }}</td>
        </tr>
        <tr>
            <th>更新日時</th>
            <td>{{ $todotestu->updated_at }}</td>
        </tr>
    </table>

    <div class="actions">
        <a href="{{ route('todotestus.index') }}" class="button-link">一覧へ戻る</a>
        <a href="{{ route('todotestus.edit', $todotestu) }}" class="button-link">編集</a>
        <form action="{{ route('todotestus.destroy', $todotestu) }}" method="POST">
            @csrf
            @method('DELETE')
            <button type="submit" onclick="return confirm('このTodotestuを削除しますか？');">削除</button>
        </form>
    </div>
</body>
</html>
