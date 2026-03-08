document.addEventListener('DOMContentLoaded', function () {
    let current = '0';

    function updateDisplay() {
        const display = document.getElementById('display');
        if (display) {
            display.value = current;
        }
    }

    document.querySelectorAll('button[data-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            // 「テスト」ボタン用：押すたびに「テスト」「テストテスト」…と連結
            if (value === 'テスト') {
                if (current === '0' || current === 'Error') {
                    current = 'テスト';
                } else {
                    current += 'テスト';
                }
                updateDisplay();
                return;
            }

            if (value === 'C') {
                current = '0';
                updateDisplay();
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

            if (current === '0' || current === 'Error') {
                if ('+-*/.'.includes(value)) {
                    if (value === '.') {
                        current = '0.';
                    } else {
                        current += value;
                    }
                } else {
                    current = value;
                }
            } else {
                current += value;
            }

            updateDisplay();
        });
    });

    updateDisplay();
});
