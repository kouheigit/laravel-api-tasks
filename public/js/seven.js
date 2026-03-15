document.addEventListener('DOMContentLoaded', function () {
    let current = '';
    let selectedAge = null; // 12,19,29,49,50 のいずれか
    let isUnlockMode = true; // 最初は数値入力モード（責任者解除で計算画面へ）
    let registerItems = {}; // product_id -> { product_name, price, quantity }（入力欄表示・seven_register_items 連動用）
    let lastClickedProduct = null; // 最後に押されたメニュー（登録/リピート用）
    let multiplyCount = null; // ✖️ボタンで指定した個数（1〜9）
    let isMultiplyInputMode = false; // ✖️押下後に次の数字入力を待機しているかどうか
    let isPaymentMode = false; // 客層選択後の支払い方法入力モードかどうか
    let selectedProductId = null; // ディスプレイで選択中の商品（取り消し用）

    // ボタン押下時のポチッという音
    function playClickSound() {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 1200;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.06);
        } catch (e) {}
    }

    // 商品クリック時のピッという音（高め・短く鋭く）
    function playProductClickSound() {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 2800;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.22, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.03);
        } catch (e) {}
    }

    var displayUnlockRow = document.getElementById('displayUnlockRow');
    var displayCalcArea = document.getElementById('displayCalcArea');
    var unlockInput = document.getElementById('unlockInput');
    var paymentSelect = document.getElementById('payment-method');
    var paymentOverlay = document.getElementById('payment-overlay');

    function updateDisplay() {
        const display = document.getElementById('display');
        if (display) {
            display.value = current;
        }
    }

    function updateDisplayFromRegisterItems() {
        var tbody = document.getElementById('displayTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        var total = 0;
        Object.keys(registerItems).forEach(function (productId) {
            var item = registerItems[productId];
            total += item.price * item.quantity;
            var tr = document.createElement('tr');
            tr.setAttribute('data-product-id', String(productId));
            if (selectedProductId !== null && String(selectedProductId) === String(productId)) {
                tr.classList.add('is-selected');
            }
            tr.innerHTML =
                '<td class="display-table-td-name">' + escapeHtml(item.product_name) + '</td>' +
                '<td class="display-table-td-price">' + escapeHtml(String(item.price)) + '</td>' +
                '<td class="display-table-td-qty">' + escapeHtml(String(item.quantity)) + '</td>';
            tbody.appendChild(tr);
        });
        var totalEl = document.getElementById('displayTotalValue');
        if (totalEl) totalEl.textContent = total;
        window.__seven_last_total_amount = total; // 支払い時に参照するため
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function addProductToRegister(productId, productName, productPrice) {
        if (isUnlockMode) return;
        var pid = String(productId);
        var price = parseInt(productPrice, 10);
        if (registerItems[pid]) {
            registerItems[pid].quantity += 1;
        } else {
            registerItems[pid] = {
                product_name: productName,
                price: price,
                quantity: 1
            };
        }
        selectedProductId = null;
        updateDisplayFromRegisterItems();
    }

    // ディスプレイ行クリック：選択（黄色ハイライト）
    var displayTbody = document.getElementById('displayTableBody');
    if (displayTbody) {
        displayTbody.addEventListener('click', function (e) {
            var tr = e.target && e.target.closest ? e.target.closest('tr') : null;
            if (!tr) return;
            var pid = tr.getAttribute('data-product-id');
            if (!pid) return;
            selectedProductId = pid;
            updateDisplayFromRegisterItems();
        });
    }

    // 取り消しボタン：選択中の商品を1個取り消し（ローカルのみ、DBは会計完了時のみ更新）
    var deleteBtn = document.getElementById('delete');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            if (isUnlockMode) return;
            if (!selectedProductId) return;

            playProductClickSound();

            var pid = String(selectedProductId);
            if (!registerItems[pid]) return;
            if (registerItems[pid].quantity > 1) {
                registerItems[pid].quantity -= 1;
            } else {
                delete registerItems[pid];
                selectedProductId = null;
            }
            updateDisplayFromRegisterItems();
        });
    }

    // 支払い方法選択：現金 / クレジットカード / 交通系IC で会計を確定
    if (paymentSelect) {
        paymentSelect.addEventListener('change', function () {
            if (!isPaymentMode) return;
            var method = paymentSelect.value;
            if (!method) return;
            if (method === 'paypay') {
                // PayPayは今は何もしない（要件外）
                return;
            }

            var responsibleNumber = 0;
            try { responsibleNumber = parseInt(sessionStorage.getItem('seven_responsible_number') || '0', 10); } catch (e) {}
            if (isNaN(responsibleNumber)) responsibleNumber = 0;
            if (selectedAge === null) return;

            var totalAmount = typeof window.__seven_last_total_amount === 'number'
                ? window.__seven_last_total_amount
                : 0;

            var items = [];
            Object.keys(registerItems).forEach(function (productId) {
                var item = registerItems[productId];
                items.push({
                    product_id: parseInt(productId, 10),
                    product_name: item.product_name,
                    price: item.price,
                    quantity: item.quantity
                });
            });
            if (items.length === 0) return;

            var csrfToken = document.querySelector('meta[name="csrf-token"]');
            var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            };
            if (csrfToken) headers['X-CSRF-TOKEN'] = csrfToken.getAttribute('content');

            fetch('/seven/register/finish', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    responsible_number: responsibleNumber,
                    customer_type: parseInt(selectedAge, 10),
                    total_amount: parseInt(totalAmount, 10),
                    items: items
                }),
                credentials: 'same-origin'
            })
            .then(function (res) { return res.json(); })
            .then(function () {
                // 会計完了後もオーバーレイ表示を継続（Cボタンで解除するまでロック）
                if (paymentSelect) paymentSelect.disabled = true;
            })
            .catch(function () {});
        });
    }

    function updateUnlockInput(appendValue) {
        if (!unlockInput) return;
        if (appendValue === 'C') {
            unlockInput.value = '';
            return;
        }
        unlockInput.value += appendValue;
    }

    // .age / .age-w 内のボタン：値だけ受け取り、ディスプレイには表示しない
    document.querySelectorAll('.age button[data-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            playClickSound();
            var label = parseInt(this.textContent, 10);
            if (!isNaN(label)) selectedAge = label;
            isPaymentMode = true;
            if (paymentOverlay) paymentOverlay.style.display = 'block';
            if (paymentSelect) paymentSelect.disabled = false;
        });
    });
    document.querySelectorAll('.age-w button[data-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            playClickSound();
            var label = parseInt(this.textContent, 10);
            if (!isNaN(label)) selectedAge = label;
            isPaymentMode = true;
            if (paymentOverlay) paymentOverlay.style.display = 'block';
            if (paymentSelect) paymentSelect.disabled = false;
        });
    });

    // .buttons 内のボタン
    document.querySelectorAll('.buttons button[data-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            playClickSound();
            const value = this.getAttribute('data-value');

            // 支払い方法モード中：Cボタンだけでロック解除して新規レジ準備
            if (isPaymentMode) {
                if (value === 'C') {
                    isPaymentMode = false;
                    if (paymentOverlay) paymentOverlay.style.display = 'none';
                    if (paymentSelect) {
                        paymentSelect.disabled = true;
                        paymentSelect.value = '';
                    }
                    registerItems = {};
                    selectedProductId = null;
                    selectedAge = null;
                    current = '';
                    multiplyCount = null;
                    isMultiplyInputMode = false;
                    updateDisplayFromRegisterItems();
                    updateDisplay();
                }
                return;
            }

            // 取り消しモード中に 0〜9 / 00 が押されたら、取り消しモードを解除するだけ（通常の数字処理は行わない）
            if (!isUnlockMode && selectedProductId !== null && (/^[0-9]$/.test(value) || value === '00')) {
                selectedProductId = null;
                updateDisplayFromRegisterItems();
                return;
            }

            // ✖️ボタン：次の数字入力を個数として解釈（計算モードのみ）
            if (value === 'x') {
                if (isUnlockMode) return;
                multiplyCount = null;
                isMultiplyInputMode = true;
                return;
            }

            // ✖️押下後の数字入力（1〜9）を個数として受け取る
            if (isMultiplyInputMode && /^[1-9]$/.test(value)) {
                multiplyCount = parseInt(value, 10);
                isMultiplyInputMode = false;
                return;
            }
            if (isMultiplyInputMode && value === 'C') {
                multiplyCount = null;
                isMultiplyInputMode = false;
                return;
            }

            // 責任者解除：下のボタン欄で押したら責任者番号を送信し、計算画面に切り替え
            if (value === '責任者解除') {
                if (isUnlockMode && displayUnlockRow && displayCalcArea) {
                    var numStr = unlockInput ? unlockInput.value.trim() : '';
                    var responsibleNumber = numStr === '' ? 0 : parseInt(numStr, 10);
                    if (isNaN(responsibleNumber)) responsibleNumber = 0;

                    var csrfToken = document.querySelector('meta[name="csrf-token"]');
                    var headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    };
                    if (csrfToken) headers['X-CSRF-TOKEN'] = csrfToken.getAttribute('content');

                    try { sessionStorage.setItem('seven_responsible_number', String(responsibleNumber)); } catch (e) {}
                    fetch('/seven/register', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({ responsible_number: responsibleNumber }),
                        credentials: 'same-origin'
                    })
                    .then(function (res) { return res.json(); })
                    .then(function () {
                        isUnlockMode = false;
                        displayUnlockRow.style.display = 'none';
                        displayCalcArea.style.display = 'flex';
                    })
                    .catch(function () {
                        isUnlockMode = false;
                        displayUnlockRow.style.display = 'none';
                        displayCalcArea.style.display = 'flex';
                    });
                } else if (!isUnlockMode) {
                    // 計算画面では責任者解除は何もしない
                }
                return;
            }

            // 責任者解除モード以外では、数字・00 は無効。C だけは計算モードでも有効
            if (!isUnlockMode && value !== 'C') {
                return;
            }

            // 数値入力モード：レジのボタンを入力欄に反映
            if (isUnlockMode) {
                if (value === 'C') {
                    updateUnlockInput('C');
                } else if (/^[0-9]+$/.test(value) || value === '00') {
                    updateUnlockInput(value);
                }
                return;
            }

            // 計算モード：従来どおりディスプレイに表示
            if (value === 'テスト') {
                if (current === '' || current === '0' || current === 'Error') {
                    current = 'テスト';
                } else {
                    current += 'テスト';
                }
                updateDisplay();
                return;
            }

            if (value === 'C') {
                current = '';
                registerItems = {};
                updateDisplayFromRegisterItems();
                return;
            }

            if (value === '=') {
                try {
                    current = String(eval(current));
                    if (current === 'Infinity' || current === 'NaN') {
                        current = 'Error';
                    }
                } catch (e) {
                    current = 'Error';
                }
                updateDisplay();
                return;
            }

            if (current === '' || current === '0' || current === 'Error') {
                if ('+-*/.'.includes(value)) {
                    if (value === '.') {
                        current = '0.';
                    } else {
                        current += value;
                    }
                } else if (value === '0') {
                    current += value;
                } else {
                    current = value;
                }
            } else {
                current += value;
            }

            updateDisplay();
        });
    });

    // 商品画像クリック：入力欄に商品名・値段・数量を表示し、seven_register_items に即時追加
    document.querySelectorAll('.seven-product-item').forEach(function (el) {
        el.addEventListener('click', function () {
            if (isUnlockMode || isPaymentMode) return;
            var productId = this.getAttribute('data-product-id');
            var productName = this.getAttribute('data-product-name');
            var productPrice = this.getAttribute('data-product-price');
            if (!productId || !productName || productPrice === null || productPrice === undefined) return;

            lastClickedProduct = { product_id: productId, product_name: productName, price: productPrice };
            playProductClickSound();
            addProductToRegister(productId, productName, productPrice);
        });
    });

    // 登録/リピートボタン：最後に押されたメニューをもう1つ（または ✖️個数ぶん）追加
    var repeatBtn = document.querySelector('button[data-value="リピート"]');
    if (repeatBtn) {
        repeatBtn.addEventListener('click', function () {
            if (isUnlockMode) return;
            if (!lastClickedProduct) return;
            playClickSound();

            // いまどの画面にいるかで挙動を変える
            var nikumanVisible = displayNikumanPanel && displayNikumanPanel.style.display !== 'none';
            var hotSnackVisible = displayHotSnackPanel && displayHotSnackPanel.style.display !== 'none';

            // ✖️で個数が指定されている場合：その個数ぶんリピート
            var times = 1;
            if (multiplyCount !== null && multiplyCount > 0) {
                times = multiplyCount;
            }

            if (nikumanVisible) {
                // 肉まん専用画面：肉まん用の別会計（nikumanItems）だけ更新し、本会計にはまだ反映しない
                var pid = String(lastClickedProduct.product_id);
                var pname = lastClickedProduct.product_name;
                var pprice = parseInt(lastClickedProduct.price, 10);
                if (!nikumanItems[pid]) {
                    nikumanItems[pid] = { product_name: pname, price: pprice, quantity: 0 };
                }
                for (var i = 0; i < times; i++) {
                    nikumanItems[pid].quantity += 1;
                }
                updateNikumanPanelDisplay();
            } else if (hotSnackVisible) {
                // ホットスナック専用画面：ホットスナック用の別会計（hotSnackItems）のみ更新
                var hpid = String(lastClickedProduct.product_id);
                var hname = lastClickedProduct.product_name;
                var hprice = parseInt(lastClickedProduct.price, 10);
                if (!hotSnackItems[hpid]) {
                    hotSnackItems[hpid] = { product_name: hname, price: hprice, quantity: 0 };
                }
                for (var j = 0; j < times; j++) {
                    hotSnackItems[hpid].quantity += 1;
                }
                updateHotSnackPanelDisplay();
            } else {
                // 通常のレジ画面：本会計にそのまま反映
                for (var k = 0; k < times; k++) {
                    addProductToRegister(lastClickedProduct.product_id, lastClickedProduct.product_name, lastClickedProduct.price);
                }
            }

            // 一度使ったらリセット
            multiplyCount = null;
        });
    }

    // 中華まんボタン：レジ画面内で肉まん一覧パネルを表示
    var nikumanBtn = document.getElementById('nikumanBtn') || document.querySelector('button[data-value="中華まん"]');
    var displayMain = document.getElementById('displayMain');
    var displayNikumanPanel = document.getElementById('displayNikumanPanel');
    var displayHotSnackPanel = document.getElementById('displayHotSnackPanel');
    var nikumanItems = {}; // 肉まん別会計用
    var hotSnackItems = {}; // ホットスナック別会計用

    function updateNikumanPanelDisplay() {
        var tbody = document.getElementById('nikumanPanelTableBody');
        var totalEl = document.getElementById('nikumanPanelTotal');
        var confirmBtn = document.getElementById('nikumanPanelConfirmBtn');
        if (!tbody || !totalEl || !confirmBtn) return;
        tbody.innerHTML = '';
        var total = 0;
        Object.keys(nikumanItems).forEach(function (productId) {
            var item = nikumanItems[productId];
            total += item.price * item.quantity;
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + escapeHtml(item.product_name) + '</td>' +
                '<td class="col-price">' + escapeHtml(String(item.price)) + '</td>' +
                '<td class="col-qty">' + escapeHtml(String(item.quantity)) + '</td>';
            tbody.appendChild(tr);
        });
        totalEl.textContent = '合計: ' + total + '円';
        confirmBtn.disabled = Object.keys(nikumanItems).length === 0;
    }

    if (nikumanBtn && displayMain && displayNikumanPanel) {
        nikumanBtn.addEventListener('click', function () {
            if (isUnlockMode || isPaymentMode) return;
            playClickSound();
            nikumanItems = {};
            updateNikumanPanelDisplay();
            if (displayHotSnackPanel) displayHotSnackPanel.style.display = 'none';
            displayMain.style.display = 'none';
            displayNikumanPanel.style.display = 'flex';
        });

        document.querySelectorAll('.nikuman-product-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (isPaymentMode) return;
                var productId = this.getAttribute('data-product-id');
                var productName = this.getAttribute('data-product-name');
                var productPrice = parseInt(this.getAttribute('data-product-price'), 10);
                if (!productId || !productName || isNaN(productPrice)) return;
                lastClickedProduct = { product_id: productId, product_name: productName, price: productPrice };
                if (!nikumanItems[productId]) {
                    nikumanItems[productId] = { product_name: productName, price: productPrice, quantity: 0 };
                }
                nikumanItems[productId].quantity += 1;
                updateNikumanPanelDisplay();
                playProductClickSound();
            });
        });

        document.getElementById('nikumanPanelConfirmBtn').addEventListener('click', function () {
            if (Object.keys(nikumanItems).length === 0) return;
            Object.keys(nikumanItems).forEach(function (productId) {
                var item = nikumanItems[productId];
                if (registerItems[productId]) {
                    registerItems[productId].quantity += item.quantity;
                } else {
                    registerItems[productId] = {
                        product_name: item.product_name,
                        price: item.price,
                        quantity: item.quantity
                    };
                }
                lastClickedProduct = { product_id: productId, product_name: item.product_name, price: item.price };
            });
            nikumanItems = {};
            updateNikumanPanelDisplay();
            updateDisplayFromRegisterItems();
            displayMain.style.display = 'flex';
            displayNikumanPanel.style.display = 'none';
            playProductClickSound();
        });

        document.getElementById('nikumanPanelCancelBtn').addEventListener('click', function () {
            nikumanItems = {};
            updateNikumanPanelDisplay();
            displayMain.style.display = 'flex';
            displayNikumanPanel.style.display = 'none';
        });
    }

    function updateHotSnackPanelDisplay() {
        var tbody = document.getElementById('hotSnackPanelTableBody');
        var totalEl = document.getElementById('hotSnackPanelTotal');
        var confirmBtn = document.getElementById('hotSnackPanelConfirmBtn');
        if (!tbody || !totalEl || !confirmBtn) return;
        tbody.innerHTML = '';
        var total = 0;
        Object.keys(hotSnackItems).forEach(function (productId) {
            var item = hotSnackItems[productId];
            total += item.price * item.quantity;
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + escapeHtml(item.product_name) + '</td>' +
                '<td class="col-price">' + escapeHtml(String(item.price)) + '</td>' +
                '<td class="col-qty">' + escapeHtml(String(item.quantity)) + '</td>';
            tbody.appendChild(tr);
        });
        totalEl.textContent = '合計: ' + total + '円';
        confirmBtn.disabled = Object.keys(hotSnackItems).length === 0;
    }

    var hotSnackBtn = document.querySelector('button[data-value="ffドリンク"]');
    if (hotSnackBtn && displayMain && displayHotSnackPanel) {
        hotSnackBtn.addEventListener('click', function () {
            if (isUnlockMode || isPaymentMode) return;
            playClickSound();
            hotSnackItems = {};
            updateHotSnackPanelDisplay();
            if (displayNikumanPanel) displayNikumanPanel.style.display = 'none';
            displayMain.style.display = 'none';
            displayHotSnackPanel.style.display = 'flex';
        });

        document.querySelectorAll('.hotSnack-product-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (isPaymentMode) return;
                var productId = this.getAttribute('data-product-id');
                var productName = this.getAttribute('data-product-name');
                var productPrice = parseInt(this.getAttribute('data-product-price'), 10);
                if (!productId || !productName || isNaN(productPrice)) return;
                lastClickedProduct = { product_id: productId, product_name: productName, price: productPrice };
                if (!hotSnackItems[productId]) {
                    hotSnackItems[productId] = { product_name: productName, price: productPrice, quantity: 0 };
                }
                hotSnackItems[productId].quantity += 1;
                updateHotSnackPanelDisplay();
                playProductClickSound();
            });
        });

        document.getElementById('hotSnackPanelConfirmBtn').addEventListener('click', function () {
            if (Object.keys(hotSnackItems).length === 0) return;
            Object.keys(hotSnackItems).forEach(function (productId) {
                var item = hotSnackItems[productId];
                if (registerItems[productId]) {
                    registerItems[productId].quantity += item.quantity;
                } else {
                    registerItems[productId] = {
                        product_name: item.product_name,
                        price: item.price,
                        quantity: item.quantity
                    };
                }
                lastClickedProduct = { product_id: productId, product_name: item.product_name, price: item.price };
            });
            hotSnackItems = {};
            updateHotSnackPanelDisplay();
            updateDisplayFromRegisterItems();
            displayMain.style.display = 'flex';
            displayHotSnackPanel.style.display = 'none';
            playProductClickSound();
        });

        document.getElementById('hotSnackPanelCancelBtn').addEventListener('click', function () {
            hotSnackItems = {};
            updateHotSnackPanelDisplay();
            displayMain.style.display = 'flex';
            displayHotSnackPanel.style.display = 'none';
        });
    }

    // 別ウィンドウ（肉まん選択）から商品追加時に呼ばれる
    window.handleProductAddedFromChild = function (data) {
        registerItems[data.product_id] = {
            product_name: data.product_name,
            price: data.price,
            quantity: data.quantity
        };
        lastClickedProduct = { product_id: String(data.product_id), product_name: data.product_name, price: data.price };
        updateDisplayFromRegisterItems();
        playProductClickSound();
    };

    updateDisplay();
});
