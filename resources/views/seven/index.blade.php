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
            <!-- 責任者解除後：計算表示エリア（表形式） -->
            <div class="display-calc-area" id="displayCalcArea" style="display: none;">
                <!-- 通常のレジ画面 -->
                <div class="display-main" id="displayMain">
                    <div class="display-table-wrap">
                        <table class="display-table">
                            <thead>
                                <tr>
                                    <th class="display-table-th-name">商品名</th>
                                    <th class="display-table-th-price">値段</th>
                                    <th class="display-table-th-qty">数量</th>
                                </tr>
                            </thead>
                            <tbody id="displayTableBody">
                            </tbody>
                        </table>
                    </div>
                    <div class="display-total" id="displayTotal">
                        <span class="display-total-label">合計</span>
                        <span class="display-total-value" id="displayTotalValue">0</span>
                    </div>
                    <div class="display-bottom-buttons">
                        <button data-value="中華まん" id="nikumanBtn">中華まん</button>
                        <button data-value="ffドリンク">ffドリンク</button>
                    </div>
                </div>
                <!-- 肉まん一覧パネル（中華まん押下で表示） -->
                <div class="display-nikuman-panel" id="displayNikumanPanel" style="display: none;">
                    <div class="nikuman-panel-title">肉まん一覧</div>
                    <div class="nikuman-panel-buttons" id="nikumanPanelButtons">
                        @if(isset($nikumanProducts))
                            @foreach($nikumanProducts as $product)
                                <button type="button" class="nikuman-product-btn"
                                    data-product-id="{{ $product->id }}"
                                    data-product-name="{{ e($product->name) }}"
                                    data-product-price="{{ $product->price }}">
                                    {{ $product->name }} <span class="price">{{ $product->price }}円</span>
                                </button>
                            @endforeach
                        @endif
                    </div>
                    <div class="nikuman-panel-subtotal">
                        <div class="nikuman-panel-subtotal-title">肉まんだけの別会計</div>
                        <table class="nikuman-panel-table">
                            <thead>
                                <tr>
                                    <th>商品名</th>
                                    <th class="col-price">値段</th>
                                    <th class="col-qty">数量</th>
                                </tr>
                            </thead>
                            <tbody id="nikumanPanelTableBody"></tbody>
                        </table>
                        <div class="nikuman-panel-total" id="nikumanPanelTotal">合計: 0円</div>
                    </div>
                    <button type="button" class="nikuman-panel-confirm-btn" id="nikumanPanelConfirmBtn">確認</button>
                    <button type="button" class="nikuman-panel-cancel-btn" id="nikumanPanelCancelBtn">取り消し</button>
                </div>
                <!-- ホットスナック一覧パネル（ffドリンク押下で表示） -->
                <div class="display-nikuman-panel" id="displayHotSnackPanel" style="display: none;">
                    <div class="nikuman-panel-title">ホットスナック一覧</div>
                    <div class="nikuman-panel-buttons" id="hotSnackPanelButtons">
                        @if(isset($hotSnackProducts))
                            @foreach($hotSnackProducts as $product)
                                <button type="button" class="hotSnack-product-btn"
                                    data-product-id="{{ $product->id }}"
                                    data-product-name="{{ e($product->name) }}"
                                    data-product-price="{{ $product->price }}">
                                    {{ $product->name }} <span class="price">{{ $product->price }}円</span>
                                </button>
                            @endforeach
                        @endif
                    </div>
                    <div class="nikuman-panel-subtotal">
                        <div class="nikuman-panel-subtotal-title">ホットスナックの別会計</div>
                        <table class="nikuman-panel-table">
                            <thead>
                                <tr>
                                    <th>商品名</th>
                                    <th class="col-price">値段</th>
                                    <th class="col-qty">数量</th>
                                </tr>
                            </thead>
                            <tbody id="hotSnackPanelTableBody"></tbody>
                        </table>
                        <div class="nikuman-panel-total" id="hotSnackPanelTotal">合計: 0円</div>
                    </div>
                    <button type="button" class="nikuman-panel-confirm-btn" id="hotSnackPanelConfirmBtn">確認</button>
                    <button type="button" class="nikuman-panel-cancel-btn" id="hotSnackPanelCancelBtn">取り消し</button>
                </div>
            </div>
        </div>
        <div class="payment-method-select">
            <div class="payment-method-line1">支払い方法を選択してください:(セブンイレブン本番では客が選択する)</div>
            <select name="payment_method" id="payment-method" class="payment-method-line2">
                <option value="">--1 つ選択してください--</option>
                <option value="cash">現金(セブンイレブン本番は客が選択する)</option>
                <option value="credit_card">クレジットカード(セブンイレブン本番は客が選択する)</option>
                <option value="ic_card">交通系IC(セブンイレブン本番は客が選択する)</option>
                <option value="paypay">PayPay支払い(セブンイレブン本番は客が選択する)</option>
            </select>
        </div>
        <div class="buttons">
            <button data-value="x">x</button>
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

