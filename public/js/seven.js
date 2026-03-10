document.addEventListener('DOMContentLoaded', function () {
    let current = '';
    let selectedAge = null;
    let isUnlockMode = true; // 最初は数値入力モード（責任者解除で計算画面へ）
    let registerItems = {}; // product_id -> { product_name, price, quantity }（入力欄表示・seven_register_items 連動用）
    let lastClickedProduct = null; // 最後に押されたメニュー（登録/リピート用）

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
            tr.innerHTML =
                '<td class="display-table-td-name">' + escapeHtml(item.product_name) + '</td>' +
                '<td class="display-table-td-price">' + escapeHtml(String(item.price)) + '</td>' +
                '<td class="display-table-td-qty">' + escapeHtml(String(item.quantity)) + '</td>';
            tbody.appendChild(tr);
        });
        var totalEl = document.getElementById('displayTotalValue');
        if (totalEl) totalEl.textContent = total;
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function addProductToRegister(productId, productName, productPrice) {
        var registerId = null;
        try { registerId = sessionStorage.getItem('seven_register_id'); } catch (e) {}
        if (!registerId) return;

        var csrfToken = document.querySelector('meta[name="csrf-token"]');
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };
        if (csrfToken) headers['X-CSRF-TOKEN'] = csrfToken.getAttribute('content');

        fetch('/seven/register/items', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                register_id: parseInt(registerId, 10),
                product_id: parseInt(productId, 10),
                product_name: productName,
                price: parseInt(productPrice, 10)
            }),
            credentials: 'same-origin'
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            registerItems[data.product_id] = {
                product_name: data.product_name,
                price: data.price,
                quantity: data.quantity
            };
            updateDisplayFromRegisterItems();
        })
        .catch(function () {});
    }

    function updateUnlockInput(appendValue) {
        if (!unlockInput) return;
        if (appendValue === 'C') {
            unlockInput.value = '';
            return;
        }
        unlockInput.value += appendValue;
    }

    // .age 内のボタン：値だけ受け取り、ディスプレイには表示しない
    document.querySelectorAll('.age button[data-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            playClickSound();
            selectedAge = this.getAttribute('data-value');
        });
    });

    // .buttons 内のボタン
    document.querySelectorAll('.buttons button[data-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            playClickSound();
            const value = this.getAttribute('data-value');

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

                    fetch('/seven/register', {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({ responsible_number: responsibleNumber }),
                        credentials: 'same-origin'
                    })
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                        if (data.register_id) {
                            try { sessionStorage.setItem('seven_register_id', data.register_id); } catch (e) {}
                        }
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
            if (isUnlockMode) return;
            var productId = this.getAttribute('data-product-id');
            var productName = this.getAttribute('data-product-name');
            var productPrice = this.getAttribute('data-product-price');
            if (!productId || !productName || productPrice === null || productPrice === undefined) return;

            lastClickedProduct = { product_id: productId, product_name: productName, price: productPrice };
            playProductClickSound();
            addProductToRegister(productId, productName, productPrice);
        });
    });

    // 登録/リピートボタン：最後に押されたメニューをもう1つ追加
    var repeatBtn = document.querySelector('button[data-value="リピート"]');
    if (repeatBtn) {
        repeatBtn.addEventListener('click', function () {
            if (isUnlockMode) return;
            if (!lastClickedProduct) return;
            playClickSound();
            addProductToRegister(lastClickedProduct.product_id, lastClickedProduct.product_name, lastClickedProduct.price);
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
            if (isUnlockMode) return;
            playClickSound();
            nikumanItems = {};
            updateNikumanPanelDisplay();
            if (displayHotSnackPanel) displayHotSnackPanel.style.display = 'none';
            displayMain.style.display = 'none';
            displayNikumanPanel.style.display = 'flex';
        });

        document.querySelectorAll('.nikuman-product-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var productId = this.getAttribute('data-product-id');
                var productName = this.getAttribute('data-product-name');
                var productPrice = parseInt(this.getAttribute('data-product-price'), 10);
                if (!productId || !productName || isNaN(productPrice)) return;
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
            var registerId = null;
            try { registerId = sessionStorage.getItem('seven_register_id'); } catch (e) {}
            if (!registerId) return;

            var csrfToken = document.querySelector('meta[name="csrf-token"]');
            var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            };
            if (csrfToken) headers['X-CSRF-TOKEN'] = csrfToken.getAttribute('content');

            var productIds = Object.keys(nikumanItems);
            var done = 0;

            function sendNext() {
                if (done >= productIds.length) {
                    nikumanItems = {};
                    updateNikumanPanelDisplay();
                    displayMain.style.display = 'flex';
                    displayNikumanPanel.style.display = 'none';
                    playProductClickSound();
                    return;
                }
                var productId = productIds[done];
                var item = nikumanItems[productId];
                fetch('/seven/register/items', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        register_id: parseInt(registerId, 10),
                        product_id: parseInt(productId, 10),
                        product_name: item.product_name,
                        price: item.price,
                        quantity: item.quantity
                    }),
                    credentials: 'same-origin'
                })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                    registerItems[data.product_id] = {
                        product_name: data.product_name,
                        price: data.price,
                        quantity: data.quantity
                    };
                    lastClickedProduct = { product_id: String(data.product_id), product_name: data.product_name, price: data.price };
                    updateDisplayFromRegisterItems();
                    done++;
                    sendNext();
                })
                .catch(function () {
                    done++;
                    sendNext();
                });
            }
            sendNext();
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
            if (isUnlockMode) return;
            playClickSound();
            hotSnackItems = {};
            updateHotSnackPanelDisplay();
            if (displayNikumanPanel) displayNikumanPanel.style.display = 'none';
            displayMain.style.display = 'none';
            displayHotSnackPanel.style.display = 'flex';
        });

        document.querySelectorAll('.hotSnack-product-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var productId = this.getAttribute('data-product-id');
                var productName = this.getAttribute('data-product-name');
                var productPrice = parseInt(this.getAttribute('data-product-price'), 10);
                if (!productId || !productName || isNaN(productPrice)) return;
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
            var registerId = null;
            try { registerId = sessionStorage.getItem('seven_register_id'); } catch (e) {}
            if (!registerId) return;

            var csrfToken = document.querySelector('meta[name="csrf-token"]');
            var headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            };
            if (csrfToken) headers['X-CSRF-TOKEN'] = csrfToken.getAttribute('content');

            var productIds = Object.keys(hotSnackItems);
            var done = 0;

            function sendNext() {
                if (done >= productIds.length) {
                    hotSnackItems = {};
                    updateHotSnackPanelDisplay();
                    displayMain.style.display = 'flex';
                    displayHotSnackPanel.style.display = 'none';
                    playProductClickSound();
                    return;
                }
                var productId = productIds[done];
                var item = hotSnackItems[productId];
                fetch('/seven/register/items', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        register_id: parseInt(registerId, 10),
                        product_id: parseInt(productId, 10),
                        product_name: item.product_name,
                        price: item.price,
                        quantity: item.quantity
                    }),
                    credentials: 'same-origin'
                })
                .then(function (res) { return res.json(); })
                .then(function (data) {
                    registerItems[data.product_id] = {
                        product_name: data.product_name,
                        price: data.price,
                        quantity: data.quantity
                    };
                    lastClickedProduct = { product_id: String(data.product_id), product_name: data.product_name, price: data.price };
                    updateDisplayFromRegisterItems();
                    done++;
                    sendNext();
                })
                .catch(function () {
                    done++;
                    sendNext();
                });
            }
            sendNext();
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
