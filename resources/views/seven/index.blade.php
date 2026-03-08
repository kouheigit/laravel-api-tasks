<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Seven / Hello</title>
    <link rel="stylesheet" href="{{ asset('css/seven.css') }}">
</head>
<body>
    <div class="calculator">
        <div class="display-wrap">
            <!-- 最初：四角の中に長い入力欄（レジボタンでここに反映） -->
            <div class="display-unlock-row" id="displayUnlockRow">
                <div class="display-unlock-header">責任者解除</div>
                <input type="text" class="display-unlock-input" id="unlockInput" placeholder="数値を入力" inputmode="numeric" autocomplete="off" readonly>
            </div>
            <!-- 責任者解除後：計算表示エリア -->
            <div class="display-calc-area" id="displayCalcArea" style="display: none;">
                <textarea class="display" id="display" readonly></textarea>
                <div class="display-bottom-buttons">
                    <button data-value="中華まん">中華まん</button>
                    <button data-value="ffドリンク">ffドリンク</button>
                </div>
            </div>
        </div>
        <div class="buttons">
            <button class="clear" data-value="C">C</button>
            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>
            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>
            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button class="zero" data-value="0">0</button>
            <button class="zero" data-value="00">00</button>
            <button data-value="責任者解除">責任者解除</button>
        </div>
        <div class="age">
            <!--客層ボタン男-->
            <button data-value="1">12</button>
            <button data-value="2">19</button>
            <button data-value="3">29</button>
            <button data-value="4">49</button>
            <button data-value="5">50</button>
        </div>
        <div class="age-w">
            <!--客層ボタン女-->
            <button data-value="6">12</button>
            <button data-value="7">19</button>
            <button data-value="8">29</button>
            <button data-value="9">49</button>
            <button data-value="10">50</button>
        </div>
        <button data-value="リピート">登録/リピート</button>
    </div>

    @if(isset($sevenProducts))
        <div class="seven-products-with-image">
            @foreach($sevenProducts as $product)
                @if($product->image_path !== null && $product->image_path !== '')
                    @php
                        $raw = trim($product->image_path, " \t\n\r\"'\/");
                        $filename = basename($raw);
                        $imgPath = 'sevenimg/' . $filename;
                    @endphp
                    <div class="seven-product-item" data-product-id="{{ $product->id }}" data-product-name="{{ e($product->name) }}" data-product-price="{{ $product->price }}">
                        <img src="{{ asset($imgPath) }}" alt="{{ $product->name }}" class="seven-product-img">
                    </div>
                @endif
            @endforeach
        </div>
    @endif

    <script src="{{ asset('js/seven.js') }}"></script>
</body>
</html>

