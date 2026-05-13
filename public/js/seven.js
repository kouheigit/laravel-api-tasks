document.addEventListener('DOMContentLoaded', function () {
    let current = '';
    let selectedAge = null; // 12,19,29,49,50 のいずれか
    let isUnlockMode = true; // 最初は数値入力モード（責任者解除で計算画面へ）
    let registerItems = {}; // product_id -> { product_name, price, quantity }（入力欄表示・seven_register_items 連動用）
    let lastClickedProduct = null; // 最後に押されたメニュー（登録/リピート用）
    let multiplyCount = null; // ✖️ボタンで指定した個数（1〜9）
    let isMultiplyInputMode = false; // ✖️押下後に次の数字入力を待機しているかどうか
    let isPaymentMode = false; // 客層選択後の支払い方法入力モードかどうか
    let isCancelMode = false; // 取り消しボタン押下後、商品欄クリックで1個取り消すモード
    let selectedDiscountAmount = null; // 売価変更で選択中の値引き額
    let registerMessageTimer = null;

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

    // 商品クリック時の音（レジ音.mp3 または従来の合成音）
    var productClickSoundUrl = document.body.getAttribute('data-product-click-sound') || '';
    function playProductClickSound() {
        if (productClickSoundUrl) {
            try {
                var audio = new Audio(productClickSoundUrl);
                audio.volume = 1;
                audio.play().catch(function () {});
            } catch (e) {}
            return;
        }
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

    // レジの引き出しが開く音
    function playRegisterOpenSound() {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var t = ctx.currentTime;
            var bufSize = Math.floor(ctx.sampleRate * 0.07);
            var buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
            var data = buf.getChannelData(0);
            for (var i = 0; i < bufSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
            }
            var noise = ctx.createBufferSource();
            noise.buffer = buf;
            var noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0.6, t);
            noise.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            noise.start(t);
            var osc = ctx.createOscillator();
            var oscGain = ctx.createGain();
            osc.connect(oscGain);
            oscGain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, t + 0.01);
            osc.frequency.exponentialRampToValueAtTime(55, t + 0.18);
            oscGain.gain.setValueAtTime(0.32, t + 0.01);
            oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            osc.start(t + 0.01);
            osc.stop(t + 0.22);
        } catch (e) {}
    }

    // ボンッという効果音（公共料金スタンプ用）
    function playBonSound() {
        try {
            var ctx = new (window.AudioContext || window.webkitAudioContext)();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(180, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.35, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.13);
        } catch (e) {}
    }

    var displayUnlockRow = document.getElementById('displayUnlockRow');
    var displayCalcArea = document.getElementById('displayCalcArea');
    var unlockInput = document.getElementById('unlockInput');
    var paymentSelect = document.getElementById('payment-method');
    var paymentOverlay = document.getElementById('payment-overlay');
    var paypaySmartphoneWrap = document.getElementById('paypaySmartphoneWrap');
    var sevenProductsWrap = document.querySelector('.seven-products-wrap');
    var productsWithImage = document.getElementById('sevenProductsWithImage');
    var priceChangePanel = document.getElementById('priceChangePanel');
    var priceChangeBackBtn = document.getElementById('priceChangeBackBtn');
    var registerMessage = document.getElementById('registerMessage');
    var displayTableWrap = document.getElementById('displayTableWrap');
    var displayTotal = document.getElementById('displayTotal');
    var utilityBillsWrap = document.getElementById('sevenUtilityBillsWrap');
    var cafeRandomWrap = document.getElementById('sevenCafeRandomWrap');
    var utilityStampModal = document.getElementById('utilityStampModal');
    var utilityRegisterOpenMsg = document.getElementById('utilityRegisterOpenMsg');
    var utilityCountRow = document.getElementById('utilityCountRow');
    var utilityCountInput = document.getElementById('utilityCountInput');
    var utilityConfirmBtn = document.getElementById('utilityConfirmBtn');
    var utilityAllConfirmBtn = document.getElementById('utilityAllConfirmBtn');
    var displayBottomButtons = document.querySelector('.display-bottom-buttons');
    var receiptVoiceRef = null;
    var isUtilityMode = false;
    var utilityTargetCount = 0;
    var utilityClickedCount = 0;
    var isUtilityCountConfirmed = false;
    var utilityStampMode = false; // 現金決済後にCで、再クリック→スタンプを押すモード
    var utilityStampTargetCount = 0;
    var utilityStampClickedCount = 0;
    var utilityStampsCompleted = false;
    var utilityPaymentLocked = false; // 現金支払い選択後、受領印が全部押されるまで操作ロック
    var forceCashOnlyPayment = false; // 公共料金フロー中（確定/確認後も含む）は現金のみ
    var paymentOptionsBackupHtml = null;

    function loadReceiptVoice() {
        var allVoices = window.speechSynthesis.getVoices();
        var jaVoices = allVoices.filter(function (v) { return v.lang && v.lang.indexOf('ja') !== -1; });
        var preferred = jaVoices.filter(function (v) {
            return /female|woman|mizuki|kyoko|haruka|japanese/i.test(v.name);
        })[0] || jaVoices[0] || allVoices[0];
        receiptVoiceRef = preferred;
    }
    loadReceiptVoice();
    if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = loadReceiptVoice;
    }

    function speakReceipt() {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance('レシートをお受け取りくださいお取り忘れにご注意ください');
        utterance.lang = 'ja-JP';
        utterance.rate = 0.95;
        utterance.pitch = 1.15;
        utterance.volume = 1;
        if (receiptVoiceRef) utterance.voice = receiptVoiceRef;
        window.speechSynthesis.speak(utterance);
    }

    function setCashOnlyPaymentOptions(isCashOnly) {
        if (!paymentSelect) return;
        if (paymentOptionsBackupHtml === null) {
            paymentOptionsBackupHtml = paymentSelect.innerHTML;
        }
        if (isCashOnly) {
            // select の option を差し替えて確実に「現金のみ」にする（disabled/hidden はブラウザ差があるため）
            paymentSelect.innerHTML =
                '<option value="">--1 つ選択してください--</option>' +
                '<option value="cash">現金</option>';
            if (paymentSelect.value && paymentSelect.value !== 'cash') {
                paymentSelect.value = '';
            }
            return;
        }
        if (paymentOptionsBackupHtml !== null) {
            paymentSelect.innerHTML = paymentOptionsBackupHtml;
        }
    }

    function resetUtilityBillsForStamp() {
        if (!utilityBillsWrap) return;
        // 既存のスタンプ削除
        utilityBillsWrap.querySelectorAll('.utility-bill-stamp').forEach(function (el) { el.remove(); });
        // クリック状態をリセット
        utilityBillsWrap.querySelectorAll('img').forEach(function (img) {
            img.dataset.clicked = '0';
            img.classList.remove('is-clicked');
        });
        utilityBillsWrap.style.pointerEvents = 'auto';
    }

    // 公共料金モード：開始・終了ヘルパー
    function enterUtilityMode() {
        if (!productsWithImage || !utilityBillsWrap) return;
        isUtilityMode = true;
        forceCashOnlyPayment = true;
        setCashOnlyPaymentOptions(true);
        // 商品画像を隠し、公共料金画像エリアを表示
        productsWithImage.style.display = 'none';
        if (cafeRandomWrap) {
            cafeRandomWrap.style.display = 'none';
            cafeRandomWrap.innerHTML = '';
        }
        utilityBillsWrap.style.display = 'grid';
        utilityBillsWrap.innerHTML = '';
        // 1〜5 枚のランダム枚数で画像を表示
        var imgSrc = document.body.getAttribute('data-utility-bill-img');
        if (!imgSrc) return;
        utilityTargetCount = Math.floor(Math.random() * 5) + 1; // 1〜5
        utilityClickedCount = 0;
        utilityStampMode = false;
        utilityStampTargetCount = 0;
        utilityStampClickedCount = 0;
        utilityStampsCompleted = false;
        utilityPaymentLocked = false;
        for (var i = 0; i < utilityTargetCount; i++) {
            var item = document.createElement('div');
            item.className = 'utility-bill-item';
            var img = document.createElement('img');
            img.src = imgSrc;
            img.alt = '公共料金伝票';
            img.dataset.clicked = '0';
            item.appendChild(img);
            utilityBillsWrap.appendChild(item);
        }
        // 入力欄を表示・リセット（商品欄内の1行として表示）
        if (utilityCountRow) utilityCountRow.style.display = 'table-row';
        if (utilityCountInput) utilityCountInput.value = '';
        isUtilityCountConfirmed = false;
        // レジ下のボタン群（中華まん／フライヤー／ドリンク／公共料金）は隠す
        if (displayBottomButtons) displayBottomButtons.style.display = 'none';
    }

    function exitUtilityMode() {
        isUtilityMode = false;
        forceCashOnlyPayment = false;
        setCashOnlyPaymentOptions(false);
        if (productsWithImage) productsWithImage.style.display = 'flex';
        if (cafeRandomWrap) {
            cafeRandomWrap.style.display = 'none';
            cafeRandomWrap.innerHTML = '';
        }
        if (utilityBillsWrap) {
            utilityBillsWrap.style.display = 'none';
            utilityBillsWrap.innerHTML = '';
        }
        if (utilityCountRow) utilityCountRow.style.display = 'none';
        if (utilityCountInput) utilityCountInput.value = '';
        utilityTargetCount = 0;
        utilityClickedCount = 0;
        isUtilityCountConfirmed = false;
        utilityStampMode = false;
        utilityStampTargetCount = 0;
        utilityStampClickedCount = 0;
        utilityStampsCompleted = false;
        utilityPaymentLocked = false;
        if (utilityAllConfirmBtn) {
            utilityAllConfirmBtn.style.display = 'none';
            utilityAllConfirmBtn.disabled = true;
        }
        // レジ下のボタン群を元に戻す
        if (displayBottomButtons) displayBottomButtons.style.display = 'flex';
    }

    // 公共料金モード：確定ボタン押下時の判定
    if (utilityConfirmBtn && utilityCountInput) {
        utilityConfirmBtn.addEventListener('click', function () {
            if (!isUtilityMode) return;
            var val = parseInt(utilityCountInput.value || '0', 10);
            // 正解・不正解の画面切り替えは行わず、ここでは枚数チェックだけ行う
            if (isNaN(val) || val !== utilityTargetCount) {
                isUtilityCountConfirmed = false;
                return;
            }
            isUtilityCountConfirmed = true;
            // 入力欄と小さい確定ボタンは消す
            if (utilityCountRow) utilityCountRow.style.display = 'none';
            // 枚数が正しく確定したタイミングで、大きな確定ボタンを表示（まだ無効）
            if (utilityAllConfirmBtn) {
                utilityAllConfirmBtn.style.display = 'block';
                utilityAllConfirmBtn.disabled = true;
            }
        });
    }

    // 公共料金モード：レジ中央の大きな確定→確認ボタン（全ての伝票をクリックし終えたら押せる）
    if (utilityAllConfirmBtn) {
        utilityAllConfirmBtn.addEventListener('click', function () {
            if (!isUtilityMode) return;
        if (utilityAllConfirmBtn.disabled) return;
            playClickSound();
            // 1回目のクリック：ラベルを「確定」→「確認」に変えるだけ
            if (utilityAllConfirmBtn.textContent === '確定') {
                utilityAllConfirmBtn.textContent = '確認';
                return;
            }
            // 2回目（確認ボタンとして押されたとき）：
            // 公共料金の支払い票画像は右側に残したまま、公共料金モードだけ終了する
            isUtilityMode = false;
            isUtilityCountConfirmed = false;
            utilityTargetCount = 0;
            utilityClickedCount = 0;
            forceCashOnlyPayment = true;

            if (utilityAllConfirmBtn) {
                utilityAllConfirmBtn.style.display = 'none';
                utilityAllConfirmBtn.disabled = true;
                utilityAllConfirmBtn.textContent = '確定';
            }
            if (displayBottomButtons) displayBottomButtons.style.display = 'flex';
            // 公共料金完了後は「中華まん」「フライヤー」「ドリンク」は表示しない
            var nikumanBtn = document.querySelector('.display-bottom-btn[data-value="中華まん"]');
            var hotSnackBtn = document.querySelector('.display-bottom-btn[data-value="ffドリンク"]');
            var drinkBtn = document.querySelector('.display-bottom-btn[data-value="ドリンク"]');
            var utilityBtn2 = document.querySelector('.display-bottom-btn[data-value="公共料金"]');
            if (nikumanBtn) nikumanBtn.style.display = 'none';
            if (hotSnackBtn) hotSnackBtn.style.display = 'none';
            if (drinkBtn) drinkBtn.style.display = 'none';
            if (utilityBtn2) utilityBtn2.style.display = 'none';
            // 公共料金フローは継続扱い（客層→支払いは現金のみ）
            setCashOnlyPaymentOptions(true);
            if (utilityBillsWrap) {
                // 画像は残す（追加クリックは不可）
                utilityBillsWrap.style.display = 'grid';
                utilityBillsWrap.style.pointerEvents = 'none';
            }
        });
    }

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
            if (selectedDiscountAmount && registerItems[productId]) {
                tr.classList.add('is-price-change-target');
            }
            if (isCancelMode && registerItems[productId]) {
                tr.classList.add('is-cancel-target');
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

    function showRegisterMessage(message, type, duration) {
        if (!registerMessage) return;
        if (registerMessageTimer) {
            clearTimeout(registerMessageTimer);
            registerMessageTimer = null;
        }
        registerMessage.textContent = message;
        registerMessage.classList.toggle('is-discount', type === 'discount');
        registerMessage.style.display = 'block';
        if (duration && duration > 0) {
            registerMessageTimer = setTimeout(function () {
                registerMessage.style.display = 'none';
                registerMessage.textContent = '';
                registerMessage.classList.remove('is-discount');
                registerMessageTimer = null;
            }, duration);
        }
    }

    function hideRegisterMessage() {
        if (!registerMessage) return;
        if (registerMessageTimer) {
            clearTimeout(registerMessageTimer);
            registerMessageTimer = null;
        }
        registerMessage.style.display = 'none';
        registerMessage.textContent = '';
        registerMessage.classList.remove('is-discount');
    }

    function getGeneralProductItems() {
        return Array.prototype.slice.call(document.querySelectorAll('.seven-product-item'));
    }

    function resetPriceChangeState(keepMessage) {
        selectedDiscountAmount = null;
        if (displayMain) displayMain.classList.remove('is-price-change-menu');
        if (displayTableWrap) displayTableWrap.style.display = '';
        if (displayTotal) displayTotal.style.display = '';
        if (displayBottomButtons) displayBottomButtons.style.display = 'flex';
        if (productsWithImage) {
            productsWithImage.classList.remove('is-price-change-selecting');
        }
        if (displayTableWrap) {
            displayTableWrap.classList.remove('is-price-change-selecting');
        }
        document.querySelectorAll('.price-change-btn').forEach(function (btn) {
            btn.classList.remove('is-selected');
        });
        if (!keepMessage) hideRegisterMessage();
    }

    function showProductList() {
        if (displayMain) displayMain.classList.remove('is-price-change-menu');
        if (displayTableWrap) displayTableWrap.style.display = '';
        if (displayTotal) displayTotal.style.display = '';
        if (displayBottomButtons) displayBottomButtons.style.display = 'flex';
        if (productsWithImage) productsWithImage.style.display = 'flex';
        if (priceChangePanel) priceChangePanel.style.display = 'none';
        if (cafeRandomWrap) {
            cafeRandomWrap.style.display = 'none';
            cafeRandomWrap.innerHTML = '';
        }
    }

    function showPriceChangePanel() {
        if (isUnlockMode || isPaymentMode || utilityPaymentLocked || isUtilityMode) return;
        if (Object.keys(registerItems).length === 0) {
            resetPriceChangeState(true);
            showProductList();
            showRegisterMessage('登録商品がありません', 'warning', 2500);
            return;
        }
        resetPriceChangeState();
        if (displayMain) displayMain.style.display = 'flex';
        if (typeof displayNikumanPanel !== 'undefined' && displayNikumanPanel) displayNikumanPanel.style.display = 'none';
        if (typeof displayHotSnackPanel !== 'undefined' && displayHotSnackPanel) displayHotSnackPanel.style.display = 'none';
        if (typeof displayDrinkPanel !== 'undefined' && displayDrinkPanel) displayDrinkPanel.style.display = 'none';
        if (displayTableWrap) displayTableWrap.style.display = 'none';
        if (displayTotal) displayTotal.style.display = 'none';
        if (displayBottomButtons) displayBottomButtons.style.display = 'none';
        if (displayMain) displayMain.classList.add('is-price-change-menu');
        if (productsWithImage) productsWithImage.style.display = 'flex';
        if (priceChangePanel) priceChangePanel.style.display = 'grid';
        if (utilityBillsWrap) utilityBillsWrap.style.display = 'none';
        if (cafeRandomWrap) cafeRandomWrap.style.display = 'none';
    }

    function selectDiscountAmount(amount, button) {
        selectedDiscountAmount = amount;
        document.querySelectorAll('.price-change-btn').forEach(function (btn) {
            btn.classList.toggle('is-selected', btn === button);
        });
        showProductList();
        if (displayTableWrap) displayTableWrap.classList.add('is-price-change-selecting');
        showRegisterMessage(amount + '円引き商品を選択中', 'discount', 0);
        updateDisplayFromRegisterItems();
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function addProductToRegister(productId, productName, productPrice, discountAmount) {
        if (isUnlockMode) return;
        var sourceProductId = parseInt(productId, 10);
        var discount = parseInt(discountAmount || 0, 10);
        if (isNaN(discount) || discount < 0) discount = 0;
        var originalPrice = parseInt(productPrice, 10);
        if (isNaN(originalPrice)) return;
        var price = Math.max(originalPrice - discount, 0);
        var pid = discount > 0 ? String(productId) + '-discount-' + String(discount) : String(productId);
        var displayName = discount > 0 ? productName + '（' + discount + '円引き）' : productName;
        if (registerItems[pid]) {
            registerItems[pid].quantity += 1;
        } else {
            registerItems[pid] = {
                product_id: sourceProductId,
                product_name: displayName,
                price: price,
                quantity: 1,
                discount_amount: discount
            };
        }
        isCancelMode = false;
        if (deleteBtn) deleteBtn.classList.remove('is-cancel-mode');
        updateDisplayFromRegisterItems();
    }

    function stripDiscountLabel(productName) {
        return String(productName || '').replace(/（\d+円引き）$/, '');
    }

    function applyDiscountToRegisterItem(productKey) {
        if (!selectedDiscountAmount || !registerItems[productKey]) return;
        var sourceItem = registerItems[productKey];
        var discount = parseInt(selectedDiscountAmount, 10);
        if (isNaN(discount) || discount <= 0) return;

        var sourceProductId = sourceItem.product_id ? parseInt(sourceItem.product_id, 10) : parseInt(productKey, 10);
        if (isNaN(sourceProductId)) sourceProductId = parseInt(String(productKey).split('-')[0], 10);
        var baseName = stripDiscountLabel(sourceItem.product_name);
        var discountedPrice = Math.max(parseInt(sourceItem.price, 10) - discount, 0);
        var discountedKey = String(sourceProductId) + '-discount-' + String(discount) + '-' + String(discountedPrice);

        if (sourceItem.quantity > 1) {
            sourceItem.quantity -= 1;
        } else {
            delete registerItems[productKey];
        }

        if (registerItems[discountedKey]) {
            registerItems[discountedKey].quantity += 1;
        } else {
            registerItems[discountedKey] = {
                product_id: sourceProductId,
                product_name: baseName + '（' + discount + '円引き）',
                price: discountedPrice,
                quantity: 1,
                discount_amount: discount
            };
        }

        lastClickedProduct = {
            product_id: discountedKey,
            product_name: baseName + '（' + discount + '円引き）',
            price: discountedPrice
        };
        playProductClickSound();
        resetPriceChangeState();
        updateDisplayFromRegisterItems();
    }

    // ディスプレイ行クリック：売価変更中は値引き適用、取り消しモード時は1個取り消し
    var displayTbody = document.getElementById('displayTableBody');
    if (displayTbody) {
        displayTbody.addEventListener('click', function (e) {
            var tr = e.target && e.target.closest ? e.target.closest('tr') : null;
            if (!tr) return;
            var pid = tr.getAttribute('data-product-id');
            if (!pid) return;
            if (selectedDiscountAmount) {
                applyDiscountToRegisterItem(pid);
                return;
            }
            if (!isCancelMode) return;

            if (!registerItems[pid]) return;
            playProductClickSound();
            if (registerItems[pid].quantity > 1) {
                registerItems[pid].quantity -= 1;
            } else {
                delete registerItems[pid];
            }
            isCancelMode = false;
            if (deleteBtn) deleteBtn.classList.remove('is-cancel-mode');
            updateDisplayFromRegisterItems();
        });
    }

    // 取り消しボタン：押下後に商品欄の該当商品をクリックすると1個取り消される（本会計・肉まん別会計・ホットスナック別会計で有効）
    var deleteBtn = document.getElementById('delete');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            if (isUnlockMode || isPaymentMode) return;
            playClickSound();
            isCancelMode = true;
            deleteBtn.classList.add('is-cancel-mode');
            updateDisplayFromRegisterItems();
            if (typeof updateNikumanPanelDisplay === 'function') updateNikumanPanelDisplay();
            if (typeof updateHotSnackPanelDisplay === 'function') updateHotSnackPanelDisplay();
            if (typeof updateDrinkPanelDisplay === 'function') updateDrinkPanelDisplay();
        });
    }

    // 会計確定API送信（現金・クレカ・IC・PayPayスマホクリック後で共通）
    function sendFinishAndLock() {
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
                product_id: item.product_id ? parseInt(item.product_id, 10) : parseInt(productId, 10),
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
            if (paymentSelect) paymentSelect.disabled = true;
        })
        .catch(function () {});
    }

    // 支払い方法選択：現金/クレカ/ICは即会計確定、PayPayは画面右にスマホ画像を表示
    if (paymentSelect) {
        paymentSelect.addEventListener('change', function () {
            if (!isPaymentMode) return;
            var method = paymentSelect.value;
            if (!method) return;
            // 公共料金フロー：現金支払いを選んだら、受領印が全部押されるまで操作をロックする
            if (forceCashOnlyPayment && method === 'cash') {
                utilityPaymentLocked = true;
                // 暗い画面は維持し、他の操作を無効化
                if (paymentOverlay) paymentOverlay.style.display = 'block';
                if (utilityStampModal) utilityStampModal.style.display = 'flex';
                // 「レジが開きました」は最初は非表示
                if (utilityRegisterOpenMsg) utilityRegisterOpenMsg.style.display = 'none';
                // スタンプ準備（票をリセット＋ポインターはまだ無効）
                utilityStampMode = true;
                utilityStampsCompleted = false;
                utilityStampTargetCount = utilityBillsWrap ? utilityBillsWrap.querySelectorAll('img').length : 0;
                utilityStampClickedCount = 0;
                resetUtilityBillsForStamp();
                if (utilityBillsWrap) utilityBillsWrap.style.pointerEvents = 'none';
                // レジが開く音を鳴らし、その後「レジが開きました」を表示してスタンプを解禁
                playRegisterOpenSound();
                setTimeout(function () {
                    if (utilityRegisterOpenMsg) utilityRegisterOpenMsg.style.display = 'block';
                    if (utilityBillsWrap) utilityBillsWrap.style.pointerEvents = 'auto';
                    setTimeout(function () {
                        if (utilityStampModal) utilityStampModal.style.display = 'none';
                    }, 800);
                }, 400);
                return;
            }
            // 公共料金モード中に支払い方法が選ばれたら終了
            if (isUtilityMode) {
                exitUtilityMode();
            }
            if (method === 'paypay') {
                if (paypaySmartphoneWrap) paypaySmartphoneWrap.style.display = 'block';
                if (sevenProductsWrap) sevenProductsWrap.style.display = 'none';
                return;
            }
            if (paypaySmartphoneWrap) paypaySmartphoneWrap.style.display = 'none';
            if (sevenProductsWrap) sevenProductsWrap.style.display = '';
            sendFinishAndLock();
            speakReceipt();
        });
    }

    // 公共料金ボタン：公共料金支払いモードに入る
    var utilityBtn = document.querySelector('.display-bottom-btn[data-value="公共料金"]');
    if (utilityBtn) {
        utilityBtn.addEventListener('click', function () {
            if (isUnlockMode || isPaymentMode) return;
            playClickSound();
            enterUtilityMode();
        });
    }

    // 公共料金画像クリック：
    // - 公共料金モード中は、クリックで 6000円を合計に反映
    // - 現金決済後にCを押した「スタンプモード」では、クリックでボン音＋スタンプ（合計は増やさない）
    if (utilityBillsWrap) {
        utilityBillsWrap.addEventListener('click', function (e) {
            if (!isUtilityMode && !utilityStampMode) return;
            if (isUtilityMode && !isUtilityCountConfirmed) return; // 枚数が正しく確定するまでクリック不可
            var img = e.target && e.target.closest ? e.target.closest('img') : null;
            if (!img) return;
            if (img.dataset.clicked === '1') return;
            img.dataset.clicked = '1';
            img.classList.add('is-clicked');
            if (utilityStampMode) {
                playBonSound();
                var stampSrc = document.body.getAttribute('data-utility-stamp-img');
                if (stampSrc) {
                    var wrap = img.closest ? img.closest('.utility-bill-item') : img.parentElement;
                    if (wrap) {
                        var stamp = document.createElement('img');
                        stamp.src = stampSrc;
                        stamp.alt = 'stamp';
                        stamp.className = 'utility-bill-stamp';
                        wrap.appendChild(stamp);
                    }
                }
                utilityStampClickedCount += 1;
                if (utilityStampTargetCount > 0 && utilityStampClickedCount >= utilityStampTargetCount) {
                    utilityStampsCompleted = true;
                    // もう触らせない
                    utilityBillsWrap.style.pointerEvents = 'none';
                }
            } else {
                playProductClickSound();
                // 公共料金1枚ぶん 6000円をレジに追加
                addProductToRegister('__utility__', '公共料金', 6000);
                utilityClickedCount += 1;
                if (utilityAllConfirmBtn && utilityClickedCount === utilityTargetCount) {
                    utilityAllConfirmBtn.disabled = false;
                }
            }
        });
    }

    // PayPayスマホ画像クリック：PayPay音源を再生 → 画像を消す → 会計完了
    if (paypaySmartphoneWrap) {
        paypaySmartphoneWrap.addEventListener('click', function () {
            var soundUrl = paypaySmartphoneWrap.getAttribute('data-paypay-sound');
            if (soundUrl) {
                try {
                    var audio = new Audio(soundUrl);
                    audio.volume = 1;
                    audio.play().catch(function () {});
                } catch (e) {}
            } else {
                playProductClickSound();
            }
            paypaySmartphoneWrap.style.display = 'none';
            if (sevenProductsWrap) sevenProductsWrap.style.display = '';
            sendFinishAndLock();
            speakReceipt();
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

    // 支払い方法選択を促す音声（12〜50 客層押下時に再生）
    function speakPayment() {
        try {
            var msg = new SpeechSynthesisUtterance('お支払い方法をお選びください');
            msg.lang = 'ja-JP';
            msg.pitch = 1.2;
            msg.rate = 0.95;
            msg.volume = 1;
            var voices = speechSynthesis.getVoices();
            var jaVoice = voices.find(function (v) { return v.lang === 'ja-JP'; });
            if (jaVoice) msg.voice = jaVoice;
            speechSynthesis.speak(msg);
        } catch (e) {}
    }

    // 中央パネル：客層ボタン（age-grid）
    document.querySelectorAll('.age-grid .age-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (utilityPaymentLocked) return;
            playClickSound();
            var label = parseInt(this.textContent, 10);
            if (!isNaN(label)) selectedAge = label;
            isPaymentMode = true;
            if (paymentOverlay) paymentOverlay.style.display = 'block';
            if (forceCashOnlyPayment || isUtilityMode) setCashOnlyPaymentOptions(true);
            if (paymentSelect) paymentSelect.disabled = false;
            speakPayment();
        });
    });

    // 左パネル：キーパッド + 売価変更/管理/取消（取消は#deleteで別処理）
    document.querySelectorAll('.keypad-grid .key-btn, .mini-buttons .mini-btn, .touch-btn[data-value="責任者解除"], .touch-btn[data-value="売価変更"]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var val = this.getAttribute('data-value');
            if (val === '取り消し') return;
            if (val === '管理') return;
            // 公共料金：現金支払い選択後は、受領印が完了するまで入力をロック（Cも無効）
            if (utilityPaymentLocked) {
                if (val === 'C' && utilityStampsCompleted) {
                    // スタンプ完了後のみ、公共料金の合計・商品を完全に消して元のレジモードへ戻す
                    utilityPaymentLocked = false;
                    utilityStampMode = false;
                    utilityStampsCompleted = false;
                    utilityStampTargetCount = 0;
                    utilityStampClickedCount = 0;
                    forceCashOnlyPayment = false;
                    setCashOnlyPaymentOptions(false);

                    isPaymentMode = false;
                    selectedAge = null;
                    if (paymentOverlay) paymentOverlay.style.display = 'none';
                    if (utilityStampModal) utilityStampModal.style.display = 'none';
                    if (paypaySmartphoneWrap) paypaySmartphoneWrap.style.display = 'none';
                    if (paymentSelect) {
                        paymentSelect.disabled = true;
                        paymentSelect.value = '';
                    }

                    // 公共料金票は消して、商品画像を再表示
                    if (utilityBillsWrap) {
                        utilityBillsWrap.style.display = 'none';
                        utilityBillsWrap.style.pointerEvents = 'auto';
                        utilityBillsWrap.innerHTML = '';
                    }
                    if (productsWithImage) productsWithImage.style.display = 'flex';

                    // 下の「中華まん」「フライヤー」「ドリンク」「公共料金」ボタンを復帰
                    if (displayBottomButtons) displayBottomButtons.style.display = 'flex';
                    var nikumanBtnRestore = document.querySelector('.display-bottom-btn[data-value="中華まん"]');
                    var hotSnackBtnRestore = document.querySelector('.display-bottom-btn[data-value="ffドリンク"]');
                    var drinkBtnRestore = document.querySelector('.display-bottom-btn[data-value="ドリンク"]');
                    var utilityBtnRestore = document.querySelector('.display-bottom-btn[data-value="公共料金"]');
                    if (nikumanBtnRestore) nikumanBtnRestore.style.display = '';
                    if (hotSnackBtnRestore) hotSnackBtnRestore.style.display = '';
                    if (drinkBtnRestore) drinkBtnRestore.style.display = '';
                    if (utilityBtnRestore) utilityBtnRestore.style.display = '';

                    // レジの商品・合計を完全にクリアして元のレジモードに
                    registerItems = {};
                    current = '';
                    multiplyCount = null;
                    isMultiplyInputMode = false;
                    isCancelMode = false;
                    lastClickedProduct = null;
                    resetPriceChangeState();
                    if (deleteBtn) deleteBtn.classList.remove('is-cancel-mode');
                    updateDisplayFromRegisterItems();
                    updateDisplay();

                    // レジ画面は「責任者解除後」の状態に
                    isUnlockMode = false;
                    if (displayUnlockRow) displayUnlockRow.style.display = 'none';
                    if (displayCalcArea) displayCalcArea.style.display = 'flex';
                }
                return;
            }
            playClickSound();
            var value = val;

            if (value === '売価変更') {
                showPriceChangePanel();
                return;
            }

            // 公共料金モード中：数字とCは公共料金枚数入力欄に反映させる
            if (isUtilityMode && utilityCountInput) {
                if (/^[0-9]$/.test(value)) {
                    if (value === '0' && utilityCountInput.value === '') {
                        return;
                    }
                    utilityCountInput.value += value;
                    return;
                }
                if (value === 'C') {
                    utilityCountInput.value = '';
                    return;
                }
            }

            // 支払い方法モード中：Cボタンだけでロック解除して新規レジ準備
            if (isPaymentMode) {
                if (value === 'C') {
                    // 公共料金フロー（現金のみ）で決済後：
                    // スタンプが全て押されるまで、Cを押しても暗い画面のまま操作不可にする
                    if (forceCashOnlyPayment && utilityBillsWrap && utilityBillsWrap.style.display !== 'none') {
                        // まだスタンプモードに入っていなければ、ここでスタンプモード開始（暗い画面は維持）
                        if (!utilityStampMode) {
                            utilityStampMode = true;
                            utilityStampsCompleted = false;
                            // 現在表示中の票の枚数をターゲットにする
                            utilityStampTargetCount = utilityBillsWrap.querySelectorAll('img').length;
                            utilityStampClickedCount = 0;
                            resetUtilityBillsForStamp();
                            // 商品欄の公共料金入力行は出さない
                            if (utilityCountRow) utilityCountRow.style.display = 'none';
                            return;
                        }
                        // スタンプが終わるまでは何もしない（暗い画面のまま）
                        if (!utilityStampsCompleted) {
                            return;
                        }
                        // スタンプ完了後のみ、支払いモード解除して通常操作に戻す
                        utilityStampMode = false;
                        isPaymentMode = false;
                        if (paymentOverlay) paymentOverlay.style.display = 'none';
                        if (paypaySmartphoneWrap) paypaySmartphoneWrap.style.display = 'none';
                        if (paymentSelect) {
                            paymentSelect.disabled = true;
                            paymentSelect.value = '';
                        }
                        // 公共料金票は残したまま、操作を戻す
                        if (utilityBillsWrap) {
                            utilityBillsWrap.style.pointerEvents = 'none';
                        }
                        return;
                    }
                    isPaymentMode = false;
                    if (paymentOverlay) paymentOverlay.style.display = 'none';
                    if (paypaySmartphoneWrap) paypaySmartphoneWrap.style.display = 'none';
                    if (sevenProductsWrap) sevenProductsWrap.style.display = '';
                    // 支払いモード解除時は、公共料金フローの現金のみ制限も解除
                    forceCashOnlyPayment = false;
                    setCashOnlyPaymentOptions(false);
                    if (paymentSelect) {
                        paymentSelect.disabled = true;
                        paymentSelect.value = '';
                    }
                    registerItems = {};
                    isCancelMode = false;
                    resetPriceChangeState();
                    if (deleteBtn) deleteBtn.classList.remove('is-cancel-mode');
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
            if (!isUnlockMode && isCancelMode && (/^[0-9]$/.test(value) || value === '00')) {
                isCancelMode = false;
                var delBtn = document.getElementById('delete');
                if (delBtn) delBtn.classList.remove('is-cancel-mode');
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

            // 責任者解除モード以外では、数字・00・小計 は無効。C だけは計算モードでも有効
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

            // 小計ボタン：何もしない
            if (value === '小計') return;

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
                resetPriceChangeState();
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
            if (selectedDiscountAmount) {
                showRegisterMessage(selectedDiscountAmount + '円引き商品を一覧から選択してください', 'discount', 1800);
                return;
            }
            var productId = this.getAttribute('data-product-id');
            var productName = this.getAttribute('data-product-name');
            var productPrice = this.getAttribute('data-product-price');
            if (!productId || !productName || productPrice === null || productPrice === undefined) return;

            var originalPrice = parseInt(productPrice, 10);
            if (isNaN(originalPrice)) return;
            lastClickedProduct = {
                product_id: productId,
                product_name: productName,
                price: originalPrice
            };
            playProductClickSound();
            addProductToRegister(productId, productName, productPrice);
        });
    });

    document.querySelectorAll('.price-change-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var amount = parseInt(this.getAttribute('data-discount-amount'), 10);
            if (isNaN(amount)) return;
            playClickSound();
            selectDiscountAmount(amount, this);
        });
    });

    if (priceChangeBackBtn) {
        priceChangeBackBtn.addEventListener('click', function () {
            playClickSound();
            resetPriceChangeState();
            showProductList();
        });
    }

    // 登録/リピートボタン：最後に押されたメニューをもう1つ（または ✖️個数ぶん）追加
    document.querySelectorAll('[data-value="リピート"]').forEach(function (repeatBtn) {
        repeatBtn.addEventListener('click', function () {
            if (isUnlockMode) return;
            if (!lastClickedProduct) return;
            playClickSound();

            // いまどの画面にいるかで挙動を変える
            var nikumanVisible = displayNikumanPanel && displayNikumanPanel.style.display !== 'none';
            var hotSnackVisible = displayHotSnackPanel && displayHotSnackPanel.style.display !== 'none';
            var drinkVisible = displayDrinkPanel && displayDrinkPanel.style.display !== 'none';

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
            } else if (drinkVisible) {
                return;
            } else {
                // 通常のレジ画面：本会計にそのまま反映
                for (var k = 0; k < times; k++) {
                    addProductToRegister(lastClickedProduct.product_id, lastClickedProduct.product_name, lastClickedProduct.price);
                }
            }

            // 一度使ったらリセット
            multiplyCount = null;
        });
    });

    // 中華まんボタン：レジ画面内で肉まん一覧パネルを表示（ディスプレイ下＋タッチパネル「お買得商品」）
    var nikumanBtns = document.querySelectorAll('[data-value="中華まん"]');
    var displayMain = document.getElementById('displayMain');
    var displayNikumanPanel = document.getElementById('displayNikumanPanel');
    var displayHotSnackPanel = document.getElementById('displayHotSnackPanel');
    var displayDrinkPanel = document.getElementById('displayDrinkPanel');
    var nikumanItems = {}; // 肉まん別会計用
    var hotSnackItems = {}; // ホットスナック別会計用
    var drinkItems = {}; // ドリンク別会計用
    var activeCafeProductId = null;

    function getDrinkProductButtons() {
        return Array.prototype.slice.call(document.querySelectorAll('.drink-product-btn'));
    }

    function clearCafeRandomDisplay() {
        activeCafeProductId = null;
        if (cafeRandomWrap) {
            cafeRandomWrap.style.display = 'none';
            cafeRandomWrap.innerHTML = '';
        }
        if (productsWithImage) productsWithImage.style.display = 'flex';
    }

    function showRandomCafeProduct() {
        var buttons = getDrinkProductButtons();
        if (!cafeRandomWrap || buttons.length === 0) {
            activeCafeProductId = null;
            if (productsWithImage) productsWithImage.style.display = 'flex';
            return;
        }
        var chosen = buttons[Math.floor(Math.random() * buttons.length)];
        activeCafeProductId = chosen.getAttribute('data-product-id');
        var productName = chosen.getAttribute('data-product-name') || '';
        var productImg = chosen.getAttribute('data-product-img') || '';
        if (productsWithImage) productsWithImage.style.display = 'none';
        cafeRandomWrap.innerHTML =
            '<div class="seven-cafe-random-card" data-product-id="' + escapeHtml(String(activeCafeProductId)) + '">' +
                '<img src="' + escapeHtml(productImg) + '" alt="' + escapeHtml(productName) + '">' +
                '<div class="seven-cafe-random-name">' + escapeHtml(productName) + '</div>' +
            '</div>';
        cafeRandomWrap.style.display = 'block';
    }

    function updateDrinkPanelDisplay() {
        var tbody = document.getElementById('drinkPanelTableBody');
        var totalEl = document.getElementById('drinkPanelTotal');
        var confirmBtn = document.getElementById('drinkPanelConfirmBtn');
        if (!tbody || !totalEl || !confirmBtn) return;
        tbody.innerHTML = '';
        var total = 0;
        Object.keys(drinkItems).forEach(function (productId) {
            var item = drinkItems[productId];
            total += item.price * item.quantity;
            var tr = document.createElement('tr');
            tr.setAttribute('data-product-id', String(productId));
            if (isCancelMode) tr.classList.add('is-cancel-target');
            tr.innerHTML =
                '<td>' + escapeHtml(item.product_name) + '</td>' +
                '<td class="col-price">' + escapeHtml(String(item.price)) + '</td>' +
                '<td class="col-qty">' + escapeHtml(String(item.quantity)) + '</td>';
            tbody.appendChild(tr);
        });
        totalEl.textContent = '合計: ' + total + '円';
        confirmBtn.disabled = Object.keys(drinkItems).length === 0;
    }

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
            tr.setAttribute('data-product-id', String(productId));
            if (isCancelMode) tr.classList.add('is-cancel-target');
            tr.innerHTML =
                '<td>' + escapeHtml(item.product_name) + '</td>' +
                '<td class="col-price">' + escapeHtml(String(item.price)) + '</td>' +
                '<td class="col-qty">' + escapeHtml(String(item.quantity)) + '</td>';
            tbody.appendChild(tr);
        });
        totalEl.textContent = '合計: ' + total + '円';
        confirmBtn.disabled = Object.keys(nikumanItems).length === 0;
    }

    if (displayMain && displayNikumanPanel) {
        nikumanBtns.forEach(function (nikumanBtn) {
            nikumanBtn.addEventListener('click', function () {
                if (isUnlockMode || isPaymentMode) return;
                playClickSound();
                resetPriceChangeState();
                nikumanItems = {};
                updateNikumanPanelDisplay();
                if (displayHotSnackPanel) displayHotSnackPanel.style.display = 'none';
                if (displayDrinkPanel) displayDrinkPanel.style.display = 'none';
                clearCafeRandomDisplay();
                displayMain.style.display = 'none';
                displayNikumanPanel.style.display = 'flex';
            });
        });

        // 肉まん商品ボタンは1回だけリスナー登録（forEach の外で実行して二重登録を防ぐ）
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

        var nikumanPanelConfirmBtn = document.getElementById('nikumanPanelConfirmBtn');
        var nikumanPanelCancelBtn = document.getElementById('nikumanPanelCancelBtn');
        if (nikumanPanelConfirmBtn) {
            nikumanPanelConfirmBtn.addEventListener('click', function () {
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
        }
        if (nikumanPanelCancelBtn) {
            nikumanPanelCancelBtn.addEventListener('click', function () {
                nikumanItems = {};
                updateNikumanPanelDisplay();
                displayMain.style.display = 'flex';
                displayNikumanPanel.style.display = 'none';
            });
        }

        // 肉まん別会計：取り消しモード時にテーブル行クリックで1個取り消し
        var nikumanPanelTableBody = document.getElementById('nikumanPanelTableBody');
        if (nikumanPanelTableBody) {
            nikumanPanelTableBody.addEventListener('click', function (e) {
                var tr = e.target && e.target.closest ? e.target.closest('tr') : null;
                if (!tr) return;
                var pid = tr.getAttribute('data-product-id');
                if (!pid) return;
                if (!isCancelMode) return;
                if (displayNikumanPanel.style.display === 'none') return;
                if (!nikumanItems[pid]) return;
                playProductClickSound();
                if (nikumanItems[pid].quantity > 1) {
                    nikumanItems[pid].quantity -= 1;
                } else {
                    delete nikumanItems[pid];
                }
                isCancelMode = false;
                if (deleteBtn) deleteBtn.classList.remove('is-cancel-mode');
                updateNikumanPanelDisplay();
            });
        }
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
            tr.setAttribute('data-product-id', String(productId));
            if (isCancelMode) tr.classList.add('is-cancel-target');
            tr.innerHTML =
                '<td>' + escapeHtml(item.product_name) + '</td>' +
                '<td class="col-price">' + escapeHtml(String(item.price)) + '</td>' +
                '<td class="col-qty">' + escapeHtml(String(item.quantity)) + '</td>';
            tbody.appendChild(tr);
        });
        totalEl.textContent = '合計: ' + total + '円';
        confirmBtn.disabled = Object.keys(hotSnackItems).length === 0;
    }

    // フライヤーボタン：ホットスナック一覧を表示（内部値は既存互換の ffドリンク）
    document.querySelectorAll('[data-value="ffドリンク"]').forEach(function (hotSnackBtn) {
        if (!displayMain || !displayHotSnackPanel) return;
        hotSnackBtn.addEventListener('click', function () {
            if (isUnlockMode || isPaymentMode) return;
            playClickSound();
            resetPriceChangeState();
            hotSnackItems = {};
            updateHotSnackPanelDisplay();
            if (displayNikumanPanel) displayNikumanPanel.style.display = 'none';
            if (displayDrinkPanel) displayDrinkPanel.style.display = 'none';
            clearCafeRandomDisplay();
            displayMain.style.display = 'none';
            displayHotSnackPanel.style.display = 'flex';
        });
    });

    if (displayMain && displayHotSnackPanel) {
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

        // ホットスナック別会計：取り消しモード時にテーブル行クリックで1個取り消し
        var hotSnackPanelTableBody = document.getElementById('hotSnackPanelTableBody');
        if (hotSnackPanelTableBody) {
            hotSnackPanelTableBody.addEventListener('click', function (e) {
                var tr = e.target && e.target.closest ? e.target.closest('tr') : null;
                if (!tr) return;
                var pid = tr.getAttribute('data-product-id');
                if (!pid) return;
                if (!isCancelMode) return;
                if (displayHotSnackPanel.style.display === 'none') return;
                if (!hotSnackItems[pid]) return;
                playProductClickSound();
                if (hotSnackItems[pid].quantity > 1) {
                    hotSnackItems[pid].quantity -= 1;
                } else {
                    delete hotSnackItems[pid];
                }
                isCancelMode = false;
                if (deleteBtn) deleteBtn.classList.remove('is-cancel-mode');
                updateHotSnackPanelDisplay();
            });
        }
    }

    // ドリンクボタン：セブンカフェ一覧を表示し、外側の商品表示エリアに正解商品をランダム表示
    document.querySelectorAll('[data-value="ドリンク"]').forEach(function (drinkBtn) {
        if (!displayMain || !displayDrinkPanel) return;
        drinkBtn.addEventListener('click', function () {
            if (isUnlockMode || isPaymentMode) return;
            playClickSound();
            resetPriceChangeState();
            drinkItems = {};
            updateDrinkPanelDisplay();
            if (displayNikumanPanel) displayNikumanPanel.style.display = 'none';
            if (displayHotSnackPanel) displayHotSnackPanel.style.display = 'none';
            displayMain.style.display = 'none';
            displayDrinkPanel.style.display = 'flex';
            showRandomCafeProduct();
        });
    });

    if (displayMain && displayDrinkPanel) {
        document.querySelectorAll('.drink-product-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (isPaymentMode) return;
                var productId = this.getAttribute('data-product-id');
                var productName = this.getAttribute('data-product-name');
                var productPrice = parseInt(this.getAttribute('data-product-price'), 10);
                if (!productId || !productName || isNaN(productPrice)) return;
                if (!activeCafeProductId || String(productId) !== String(activeCafeProductId)) return;

                lastClickedProduct = { product_id: productId, product_name: productName, price: productPrice };
                if (!drinkItems[productId]) {
                    drinkItems[productId] = { product_name: productName, price: productPrice, quantity: 0 };
                }
                drinkItems[productId].quantity += 1;
                updateDrinkPanelDisplay();
                activeCafeProductId = null;
                if (cafeRandomWrap) {
                    cafeRandomWrap.style.display = 'none';
                    cafeRandomWrap.innerHTML = '';
                }
                playProductClickSound();
            });
        });

        var drinkPanelConfirmBtn = document.getElementById('drinkPanelConfirmBtn');
        var drinkPanelCancelBtn = document.getElementById('drinkPanelCancelBtn');
        if (drinkPanelConfirmBtn) {
            drinkPanelConfirmBtn.addEventListener('click', function () {
                if (Object.keys(drinkItems).length === 0) return;
                Object.keys(drinkItems).forEach(function (productId) {
                    var item = drinkItems[productId];
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
                drinkItems = {};
                updateDrinkPanelDisplay();
                updateDisplayFromRegisterItems();
                displayMain.style.display = 'flex';
                displayDrinkPanel.style.display = 'none';
                clearCafeRandomDisplay();
                playProductClickSound();
            });
        }
        if (drinkPanelCancelBtn) {
            drinkPanelCancelBtn.addEventListener('click', function () {
                drinkItems = {};
                updateDrinkPanelDisplay();
                displayMain.style.display = 'flex';
                displayDrinkPanel.style.display = 'none';
                clearCafeRandomDisplay();
            });
        }

        // ドリンク別会計：取り消しモード時にテーブル行クリックで1個取り消し
        var drinkPanelTableBody = document.getElementById('drinkPanelTableBody');
        if (drinkPanelTableBody) {
            drinkPanelTableBody.addEventListener('click', function (e) {
                var tr = e.target && e.target.closest ? e.target.closest('tr') : null;
                if (!tr) return;
                var pid = tr.getAttribute('data-product-id');
                if (!pid) return;
                if (!isCancelMode) return;
                if (displayDrinkPanel.style.display === 'none') return;
                if (!drinkItems[pid]) return;
                playProductClickSound();
                if (drinkItems[pid].quantity > 1) {
                    drinkItems[pid].quantity -= 1;
                } else {
                    delete drinkItems[pid];
                }
                isCancelMode = false;
                if (deleteBtn) deleteBtn.classList.remove('is-cancel-mode');
                updateDrinkPanelDisplay();
            });
        }
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
