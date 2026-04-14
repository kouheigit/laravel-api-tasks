<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExpenseBoard 支出詳細</title>
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
            margin-bottom: 16px;
        }
    </style>
</head>
<body>
    <h1>ExpenseBoard 支出詳細</h1>

    @if (session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

    <table>
        <tr>
            <th>ID</th>
            <td>{{ $expense->id }}</td>
        </tr>
        <tr>
            <th>カテゴリ</th>
            <td>{{ $expense->category->name }}</td>
        </tr>
        <tr>
            <th>日付</th>
            <td>{{ $expense->spent_on }}</td>
        </tr>
        <tr>
            <th>タイトル</th>
            <td>{{ $expense->title }}</td>
        </tr>
        <tr>
            <th>金額</th>
            <td>{{ number_format($expense->amount) }} 円</td>
        </tr>
        <tr>
            <th>メモ</th>
            <td>{{ $expense->memo ?: '-' }}</td>
        </tr>
        <tr>
            <th>作成日時</th>
            <td>{{ $expense->created_at }}</td>
        </tr>
        <tr>
            <th>更新日時</th>
            <td>{{ $expense->updated_at }}</td>
        </tr>
    </table>

    <div class="actions">
        <a href="{{ route('expenses.index') }}" class="button-link">一覧へ戻る</a>
        <a href="{{ route('expenses.edit', $expense) }}" class="button-link">編集</a>
        <form action="{{ route('expenses.destroy', $expense) }}" method="POST">
            @csrf
            @method('DELETE')
            <button type="submit" onclick="return confirm('この支出を削除しますか？');">削除</button>
        </form>
    </div>
</body>
</html>
