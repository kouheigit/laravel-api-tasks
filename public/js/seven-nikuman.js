document.addEventListener('DOMContentLoaded', function () {
    var nikumanItems = {}; // product_id -> { product_name, price, quantity }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function updateNikumanDisplay() {
        var tbody = document.getElementById('nikumanTableBody');
        var totalEl = document.getElementById('nikumanTotal');
        var confirmBtn = document.getElementById('nikumanConfirmBtn');
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

    // 商品ボタンクリック：別会計に追加（本会計にはまだ反映しない）
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
            updateNikumanDisplay();
        });
    });

    // 確認ボタン：本会計に反映
    document.getElementById('nikumanConfirmBtn').addEventListener('click', function () {
        if (Object.keys(nikumanItems).length === 0) return;

        var registerId = null;
        try { registerId = sessionStorage.getItem('seven_register_id'); } catch (e) {}
        if (!registerId || !window.opener) return;

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
                updateNikumanDisplay();
                if (window.opener) window.close();
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
                if (window.opener && typeof window.opener.handleProductAddedFromChild === 'function') {
                    window.opener.handleProductAddedFromChild(data);
                }
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

    updateNikumanDisplay();
});
