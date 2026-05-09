<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>中華まん選択</title>
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
            display: grid;
            grid-template-columns: 64px 1fr auto;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            font-size: 1rem;
            text-align: left;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: #fff;
            cursor: pointer;
        }
        .nikuman-buttons button:hover { background: #f0f0f0; }
        .nikuman-buttons button .price { color: #666; white-space: nowrap; }
        .nikuman-window-product-img {
            width: 56px;
            height: 56px;
            object-fit: contain;
        }
        .nikuman-window-product-name {
            min-width: 0;
            overflow-wrap: anywhere;
        }
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
            <div class="nikuman-title">中華まん一覧</div>
            <div class="nikuman-buttons">
                @foreach($nikumanProducts as $product)
                    @php
                        $raw = trim((string) $product->image_path, " \t\n\r\"'\/");
                        $imgPath = str_starts_with($raw, 'sevenimg/')
                            ? $raw
                            : 'sevenimg/' . $raw;
                    @endphp
                    <button type="button" class="nikuman-product-btn"
                        data-product-id="{{ $product->id }}"
                        data-product-name="{{ e($product->name) }}"
                        data-product-price="{{ $product->price }}"
                        aria-label="{{ $product->name }}を選択">
                        @if($product->image_path)
                            <img src="{{ asset($imgPath) }}" alt="{{ $product->name }}" class="nikuman-window-product-img">
                        @endif
                        <span class="nikuman-window-product-name">{{ $product->name }}</span>
                        <span class="price">{{ $product->price }}円</span>
                    </button>
                @endforeach
            </div>
            @if($nikumanProducts->isEmpty())
                <p>該当する商品がありません。</p>
            @endif
        </div>
        <div class="nikuman-subtotal">
            <div class="nikuman-subtotal-title">中華まんだけの別会計</div>
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
