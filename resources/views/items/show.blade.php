<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StockFlow 商品詳細</title>
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
            width: 180px;
            background: #f6f8fa;
        }
        .panel {
            margin-top: 24px;
            padding: 16px;
            border: 1px solid #d0d7de;
        }
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        label {
            display: block;
            margin-top: 12px;
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
        .success, .errors {
            padding: 12px;
            margin-bottom: 16px;
        }
        .success {
            background: #e6ffed;
            border: 1px solid #b7ebc6;
        }
        .errors {
            background: #fff5f5;
            border: 1px solid #f1aeb5;
        }
    </style>
</head>
<body>
    <h1>StockFlow 商品詳細</h1>

    @if (session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

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

    <table>
        <tr>
            <th>ID</th>
            <td>{{ $item->id }}</td>
        </tr>
        <tr>
            <th>商品名</th>
            <td>{{ $item->name }}</td>
        </tr>
        <tr>
            <th>SKU</th>
            <td>{{ $item->sku }}</td>
        </tr>
        <tr>
            <th>在庫数</th>
            <td>{{ $item->stock }}</td>
        </tr>
        <tr>
            <th>しきい値</th>
            <td>{{ $item->low_stock_threshold }}</td>
        </tr>
        <tr>
            <th>メモ</th>
            <td>{{ $item->note ?: '-' }}</td>
        </tr>
    </table>

    <div class="actions">
        <a href="{{ route('items.index') }}" class="button-link">一覧へ戻る</a>
        <a href="{{ route('items.edit', $item) }}" class="button-link">編集</a>
        <form action="{{ route('items.destroy', $item) }}" method="POST">
            @csrf
            @method('DELETE')
            <button type="submit" onclick="return confirm('この商品を削除しますか？');">削除</button>
        </form>
    </div>

    <div class="grid">
        <div class="panel">
            <h2>入庫</h2>
            <form action="{{ route('stock-movements.store') }}" method="POST">
                @csrf
                <input type="hidden" name="item_id" value="{{ $item->id }}">
                <input type="hidden" name="type" value="in">

                <label for="in_quantity">数量</label>
                <input type="number" id="in_quantity" name="quantity" value="{{ old('type') === 'in' ? old('quantity') : '' }}" min="1" required>

                <label for="in_moved_at">日時</label>
                <input type="datetime-local" id="in_moved_at" name="moved_at" value="{{ old('type') === 'in' ? old('moved_at') : now()->format('Y-m-d\\TH:i') }}" required>

                <label for="in_memo">メモ</label>
                <textarea id="in_memo" name="memo" rows="4">{{ old('type') === 'in' ? old('memo') : '' }}</textarea>

                <div class="actions">
                    <button type="submit">入庫を記録</button>
                </div>
            </form>
        </div>

        <div class="panel">
            <h2>出庫</h2>
            <form action="{{ route('stock-movements.store') }}" method="POST">
                @csrf
                <input type="hidden" name="item_id" value="{{ $item->id }}">
                <input type="hidden" name="type" value="out">

                <label for="out_quantity">数量</label>
                <input type="number" id="out_quantity" name="quantity" value="{{ old('type') === 'out' ? old('quantity') : '' }}" min="1" required>

                <label for="out_moved_at">日時</label>
                <input type="datetime-local" id="out_moved_at" name="moved_at" value="{{ old('type') === 'out' ? old('moved_at') : now()->format('Y-m-d\\TH:i') }}" required>

                <label for="out_memo">メモ</label>
                <textarea id="out_memo" name="memo" rows="4">{{ old('type') === 'out' ? old('memo') : '' }}</textarea>

                <div class="actions">
                    <button type="submit">出庫を記録</button>
                </div>
            </form>
        </div>
    </div>

    <div class="panel">
        <h2>入出庫履歴</h2>
        <table>
            <thead>
                <tr>
                    <th>日時</th>
                    <th>種別</th>
                    <th>数量</th>
                    <th>メモ</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($item->stockMovements as $stockMovement)
                    <tr>
                        <td>{{ $stockMovement->moved_at }}</td>
                        <td>{{ $stockMovement->type }}</td>
                        <td>{{ $stockMovement->quantity }}</td>
                        <td>{{ $stockMovement->memo ?: '-' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4">入出庫履歴はまだありません。</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</body>
</html>
