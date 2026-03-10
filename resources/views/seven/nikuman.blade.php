<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>肉まん選択</title>
    <link rel="stylesheet" href="{{ asset('css/seven.css') }}">
    <style>
        .nikuman-window {
            padding: 20px;
            max-width: 450px;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .nikuman-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.5rem; }
        .nikuman-buttons {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .nikuman-buttons button {
            padding: 12px 16px;
            font-size: 1rem;
            text-align: left;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: #fff;
            cursor: pointer;
        }
        .nikuman-buttons button:hover { background: #f0f0f0; }
        .nikuman-buttons button .price { float: right; color: #666; }
        .nikuman-subtotal {
            border: 1px solid #ccc;
            border-radius: 4px;
            overflow: hidden;
        }
        .nikuman-subtotal-title {
            background: #333;
            color: #fff;
            padding: 8px 12px;
            font-weight: 600;
        }
        .nikuman-subtotal-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        .nikuman-subtotal-table th, .nikuman-subtotal-table td {
            padding: 6px 10px;
            border-bottom: 1px solid #eee;
        }
        .nikuman-subtotal-table th {
            background: #f5f5f5;
            text-align: left;
        }
        .nikuman-subtotal-table .col-price, .nikuman-subtotal-table .col-qty { text-align: right; }
        .nikuman-subtotal-total {
            background: #333;
            color: #fff;
            font-weight: 600;
            padding: 10px 12px;
            text-align: right;
        }
        .nikuman-confirm-btn {
            padding: 14px 24px;
            font-size: 1.1rem;
            font-weight: 600;
            background: #2e7d32;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .nikuman-confirm-btn:hover { background: #1b5e20; }
        .nikuman-confirm-btn:disabled {
            background: #999;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div class="nikuman-window">
        <div>
            <div class="nikuman-title">肉まん一覧</div>
            <div class="nikuman-buttons">
                @foreach($nikumanProducts as $product)
                    <button type="button" class="nikuman-product-btn"
                        data-product-id="{{ $product->id }}"
                        data-product-name="{{ e($product->name) }}"
                        data-product-price="{{ $product->price }}">
                        {{ $product->name }} <span class="price">{{ $product->price }}円</span>
                    </button>
                @endforeach
            </div>
            @if($nikumanProducts->isEmpty())
                <p>該当する商品がありません。</p>
            @endif
        </div>
        <div class="nikuman-subtotal">
            <div class="nikuman-subtotal-title">肉まんだけの別会計</div>
            <table class="nikuman-subtotal-table">
                <thead>
                    <tr>
                        <th>商品名</th>
                        <th class="col-price">値段</th>
                        <th class="col-qty">数量</th>
                    </tr>
                </thead>
                <tbody id="nikumanTableBody"></tbody>
            </table>
            <div class="nikuman-subtotal-total" id="nikumanTotal">合計: 0円</div>
        </div>
        <button type="button" class="nikuman-confirm-btn" id="nikumanConfirmBtn">確認</button>
    </div>
    <script src="{{ asset('js/seven-nikuman.js') }}"></script>
</body>
</html>
