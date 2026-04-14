<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StockFlow 商品登録</title>
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
        input, textarea {
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
    <h1>StockFlow 商品登録</h1>

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

    <form action="{{ route('items.store') }}" method="POST">
        @csrf

        <label for="name">商品名</label>
        <input type="text" id="name" name="name" value="{{ old('name') }}" maxlength="255" required>

        <label for="sku">SKU</label>
        <input type="text" id="sku" name="sku" value="{{ old('sku') }}" maxlength="100" required>

        <label for="stock">初期在庫</label>
        <input type="number" id="stock" name="stock" value="{{ old('stock', 0) }}" min="0" required>

        <label for="low_stock_threshold">しきい値</label>
        <input type="number" id="low_stock_threshold" name="low_stock_threshold" value="{{ old('low_stock_threshold', 0) }}" min="0" required>

        <label for="note">メモ</label>
        <textarea id="note" name="note" rows="5">{{ old('note') }}</textarea>

        <div class="actions">
            <button type="submit">登録</button>
            <a href="{{ route('items.index') }}" class="button-link">一覧へ戻る</a>
        </div>
    </form>
</body>
</html>
