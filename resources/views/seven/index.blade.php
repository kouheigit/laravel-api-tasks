<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Seven / Hello</title>
    <link rel="stylesheet" href="{{ asset('css/seven.css') }}">
</head>
<body data-product-click-sound="{{ asset('audio/レジ音.mp3') }}" data-utility-bill-img="{{ asset('sevenimg/utilitybills.png') }}">
    <div class="seven-layout">
        @if(isset($sevenProducts))
            <aside class="seven-products-wrap">
                <div class="seven-products-with-image" id="sevenProductsWithImage">
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
                <div class="seven-utility-bills-wrap" id="sevenUtilityBillsWrap"></div>
            </aside>
        @endif
        <div class="seven-register-column">
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
                                    <th class="display-table-th-name">
                                        商品名
                                        <!-- 公共料金モード：枚数入力と確定ボタン（商品名ヘッダ内に表示） -->
                                        <div class="utility-count-row" id="utilityCountRow" style="display: none; margin-top: 4px;">
                                            <span class="utility-count-label">公共料金の枚数</span>
                                            <input type="text" id="utilityCountInput" class="utility-count-input" readonly inputmode="numeric" autocomplete="off">
                                            <button type="button" id="utilityConfirmBtn" class="utility-confirm-btn">確定</button>
                                        </div>
                                    </th>
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
                        <button type="button" class="display-bottom-btn" data-value="中華まん" id="nikumanBtn">中華まん</button>
                        <button type="button" class="display-bottom-btn" data-value="ffドリンク" id="hotSnackBtn">ffドリンク</button>
                        <button type="button" class="display-bottom-btn" data-value="公共料金">公共料金</button>
            </div>
            <!-- 公共料金モード：正しい枚数入力時に表示する白いレジ画面 -->
            <div class="utility-overlay" id="utilityOverlay" style="display: none;"></div>
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
            <div class="payment-overlay" id="payment-overlay" style="display: none;"></div>
        </div>
        <div class="payment-method-select">
            <div class="payment-method-line1">支払い方法を選択してください（セブンイレブン本番では客が選択する）</div>
            <select name="payment_method" id="payment-method" class="payment-method-line2" disabled>
                <option value="">--1 つ選択してください--</option>
                <option value="cash">現金</option>
                <option value="credit_card">クレジットカード</option>
                <option value="ic_card">交通系IC</option>
                <option value="paypay">PayPay支払い</option>
            </select>
        </div>

        <!-- 参照 seven_register_button_panel_react.jsx：grid-cols-[1.1fr_0.62fr_1.2fr] -->
        <div class="pos-panel">
            <section class="pos-section pos-left">
                <div class="mini-buttons">
                    <button type="button" class="mini-btn mini-dark" data-value="責任者解除">機能</button>
                    <button type="button" class="mini-btn mini-gold" data-value="管理">管理</button>
                    <button type="button" class="mini-btn mini-pink" id="delete" data-value="取り消し">取消</button>
                </div>
                <div class="keypad-grid">
                    <button type="button" class="key-btn action-key" data-value="C">C</button>
                    <button type="button" class="key-btn action-key" data-value="x">×</button>
                    <button type="button" class="key-btn" data-value="7">7</button>
                    <button type="button" class="key-btn" data-value="8">8</button>
                    <button type="button" class="key-btn" data-value="9">9</button>
                    <button type="button" class="key-btn" data-value="4">4</button>
                    <button type="button" class="key-btn" data-value="5">5</button>
                    <button type="button" class="key-btn" data-value="6">6</button>
                    <button type="button" class="key-btn" data-value="1">1</button>
                    <button type="button" class="key-btn" data-value="2">2</button>
                    <button type="button" class="key-btn" data-value="3">3</button>
                    <button type="button" class="key-btn" data-value="0">0</button>
                    <button type="button" class="key-btn" data-value="00">00</button>
                    <button type="button" class="key-btn key-subtotal" data-value="小計">小計</button>
                </div>
            </section>
            <section class="pos-section pos-center">
                <div class="age-grid">
                    <button type="button" class="age-btn age-left" data-value="1">12</button>
                    <button type="button" class="age-btn age-right" data-value="6">12</button>
                    <button type="button" class="age-btn age-left" data-value="2">19</button>
                    <button type="button" class="age-btn age-right" data-value="7">19</button>
                    <button type="button" class="age-btn age-left" data-value="3">29</button>
                    <button type="button" class="age-btn age-right" data-value="8">29</button>
                    <button type="button" class="age-btn age-left" data-value="4">49</button>
                    <button type="button" class="age-btn age-right" data-value="9">49</button>
                    <button type="button" class="age-btn age-left" data-value="5">50</button>
                    <button type="button" class="age-btn age-right" data-value="10">50</button>
                </div>
                <button type="button" class="receipt-btn" data-value="リピート">登録/リピート</button>
            </section>
            <section class="pos-section pos-right">
                <div class="touch-grid">
                    <button type="button" class="touch-btn" data-value="中華まん">お買得商品</button>
                    <button type="button" class="touch-btn" data-value="ffドリンク">イチオシメニュー</button>
                    <button type="button" class="touch-btn" data-value="">特典</button>
                    <button type="button" class="touch-btn" data-value="リピート">おすすめ</button>
                    <button type="button" class="touch-btn" data-value="">公共料金払込</button>
                    <button type="button" class="touch-btn" data-value="">宅配</button>
                    <button type="button" class="touch-btn" data-value="">クーポン</button>
                    <button type="button" class="touch-btn" data-value="">郵便</button>
                    <button type="button" class="touch-btn" data-value="">収納代行</button>
                    <button type="button" class="touch-btn" data-value="">チケット</button>
                    <button type="button" class="touch-btn" data-value="">金券</button>
                    <button type="button" class="touch-btn" data-value="">ｅサービス</button>
                    <button type="button" class="touch-btn" data-value="">値引／取消</button>
                    <button type="button" class="touch-btn" data-value="">CG</button>
                    <button type="button" class="touch-btn" data-value="">スキャン入力</button>
                    <button type="button" class="touch-btn touch-btn-responsible" data-value="責任者解除">責任者解除</button>
                    <button type="button" class="touch-btn" data-value="">ポイント</button>
                    <button type="button" class="touch-btn" data-value="">機能</button>
                </div>
            </section>
        </div>
        </div>
    </div>
    <!-- PayPay支払い選択時：画面右に表示。クリックで会計完了 -->
    <div class="paypay-smartphone-wrap" id="paypaySmartphoneWrap" style="display: none;" title="スマホをタップして支払い完了" data-paypay-sound="{{ asset('audio/PayPay.mp3') }}">
        <img src="{{ asset('sevenimg/smartphone.png') }}" alt="PayPay" class="paypay-smartphone-img" id="paypaySmartphoneImg">
    </div>

    <script src="{{ asset('js/seven.js') }}"></script>
</body>
</html>

