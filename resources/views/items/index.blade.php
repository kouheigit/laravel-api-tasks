<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StockFlow 商品一覧</title>
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
            margin-bottom: 16px;
        }
        .badge {
            display: inline-block;
            padding: 2px 8px;
            border: 1px solid #999;
        }
    </style>
</head>
<body>
    <h1>StockFlow 商品一覧</h1>

    @if (session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

    <p>
        <a href="{{ route('items.create') }}" class="button-link">商品を登録</a>
    </p>

    <table>
        <thead>
            <tr>
                <th>商品名</th>
                <th>SKU</th>
                <th>在庫数</th>
                <th>しきい値</th>
                <th>ステータス</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($items as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->sku }}</td>
                    <td>{{ $item->stock }}</td>
                    <td>{{ $item->low_stock_threshold }}</td>
                    <td>
                        @if ($item->stock === 0)
                            <span class="badge">在庫切れ</span>
                        @elseif ($item->stock <= $item->low_stock_threshold)
                            <span class="badge">残少</span>
                        @else
                            <span class="badge">在庫あり</span>
                        @endif
                    </td>
                    <td>
                        <div class="actions">
                            <a href="{{ route('items.show', $item) }}" class="button-link">詳細</a>
                            <a href="{{ route('items.edit', $item) }}" class="button-link">編集</a>
                            <form action="{{ route('items.destroy', $item) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" onclick="return confirm('この商品を削除しますか？');">削除</button>
                            </form>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6">商品はまだ登録されていません。</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 20px;">
        {{ $items->links() }}
    </div>
</body>
</html>
