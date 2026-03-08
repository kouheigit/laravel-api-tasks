document.addEventListener('DOMContentLoaded', function () {
    let current = '';
    let selectedAge = null;
    let isUnlockMode = true; // 最初は数値入力モード（責任者解除で計算画面へ）
    let registerItems = {}; // product_id -> { product_name, price, quantity }（入力欄表示・seven_register_items 連動用）

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
        Object.keys(registerItems).forEach(function (productId) {
            var item = registerItems[productId];
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td class="display-table-td-name">' + escapeHtml(item.product_name) + '</td>' +
                '<td class="display-table-td-price">' + escapeHtml(String(item.price)) + '</td>' +
                '<td class="display-table-td-qty">' + escapeHtml(String(item.quantity)) + '</td>';
            tbody.appendChild(tr);
        });
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
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
            var registerId = null;
            try { registerId = sessionStorage.getItem('seven_register_id'); } catch (e) {}
            if (!registerId) {
                return;
            }
            var productId = this.getAttribute('data-product-id');
            var productName = this.getAttribute('data-product-name');
            var productPrice = this.getAttribute('data-product-price');
            if (!productId || !productName || productPrice === null || productPrice === undefined) return;

            playProductClickSound();

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
        });
    });

    updateDisplay();
});
