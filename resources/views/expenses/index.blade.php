<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExpenseBoard 支出一覧</title>
    <style>
        body {
            font-family: sans-serif;
            max-width: 1100px;
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
        .toolbar,
        .actions {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
        }
        .button-link,
        button,
        input {
            display: inline-block;
            padding: 8px 12px;
            border: 1px solid #333;
            background: #fff;
            color: #111;
            text-decoration: none;
            box-sizing: border-box;
        }
        .summary {
            margin-top: 16px;
            padding: 12px;
            border: 1px solid #d0d7de;
            background: #f8fafc;
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
    <h1>ExpenseBoard 支出一覧</h1>

    @if (session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

    <form method="GET" action="{{ route('expenses.index') }}" class="toolbar">
        <label for="month">月別表示</label>
        <input type="month" id="month" name="month" value="{{ $selectedMonth }}">
        <button type="submit">絞り込み</button>
        <a href="{{ route('expenses.index') }}" class="button-link">当月に戻す</a>
        <a href="{{ route('expenses.create') }}" class="button-link">支出を登録</a>
        <a href="{{ route('categories.index') }}" class="button-link">カテゴリ管理</a>
    </form>

    <div class="summary">
        <strong>{{ $selectedMonth }}</strong> の合計金額: <strong>{{ number_format($monthlyTotal) }} 円</strong>
    </div>

    <table>
        <thead>
            <tr>
                <th>日付</th>
                <th>タイトル</th>
                <th>カテゴリ名</th>
                <th>金額</th>
                <th>メモ</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($expenses as $expense)
                <tr>
                    <td>{{ $expense->spent_on }}</td>
                    <td>{{ $expense->title }}</td>
                    <td>{{ $expense->category->name }}</td>
                    <td>{{ number_format($expense->amount) }} 円</td>
                    <td>{{ $expense->memo ?: '-' }}</td>
                    <td>
                        <div class="actions">
                            <a href="{{ route('expenses.show', $expense) }}" class="button-link">詳細</a>
                            <a href="{{ route('expenses.edit', $expense) }}" class="button-link">編集</a>
                            <form action="{{ route('expenses.destroy', $expense) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" onclick="return confirm('この支出を削除しますか？');">削除</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6">この月の支出はまだ登録されていません。</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 20px;">
        {{ $expenses->links() }}
    </div>
</body>
</html>
