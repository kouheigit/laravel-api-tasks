<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Order Example / Stock Manager</title>
    <style>
        body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; padding: 24px; }
        .card { max-width: 720px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px; }
        .row { display: flex; gap: 12px; flex-wrap: wrap; }
        .box { flex: 1 1 240px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 10px; }
        label { display:block; font-size: 12px; color:#374151; margin-bottom: 6px; }
        input { width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 10px; }
        button { margin-top: 10px; padding: 10px 12px; border-radius: 10px; border: 1px solid #111827; background: #111827; color: white; cursor: pointer; }
        .muted { color:#6b7280; font-size: 12px; }
        .status { padding: 10px 12px; background: #ecfeff; border: 1px solid #a5f3fc; border-radius: 10px; margin-bottom: 12px; }
        .error { padding: 10px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; margin-bottom: 12px; }
        code { background: #f3f4f6; padding: 2px 6px; border-radius: 6px; }
    </style>
</head>
<body>
<div class="card">
    <h2>在庫管理（StockManager）サンプル</h2>
    <p class="muted">在庫はセッションに保存されます。減算して <code>0</code> 未満になったら <code>0</code> に戻して「在庫切れ」にします。</p>

    @if (!empty($status))
        <div class="status">{{ $status }}</div>
    @endif

    @if ($errors->any())
        <div class="error">
            <div><strong>入力エラー</strong></div>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="row">
        <div class="box">
            <h3>現在の在庫</h3>
            <p style="font-size:28px; margin: 6px 0;"><strong>{{ $stock }}</strong></p>

            <form method="POST" action="{{ route('order-example.set-stock') }}">
                @csrf
                <label for="stock">在庫数をセット</label>
                <input id="stock" name="stock" type="number" min="0" value="{{ old('stock', $stock) }}">
                <button type="submit">更新</button>
            </form>
        </div>

        <div class="box">
            <h3>在庫を減らす</h3>
            <form method="POST" action="{{ route('order-example.decrease') }}">
                @csrf
                <input type="hidden" name="stock" value="{{ $stock }}">
                <label for="quantity">減らす数</label>
                <input id="quantity" name="quantity" type="number" min="1" value="{{ old('quantity', 1) }}">
                <button type="submit">減算</button>
            </form>
        </div>
    </div>
</div>
</body>
</html>

