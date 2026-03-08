document.addEventListener('DOMContentLoaded', function () {
    let current = '0';
    let selectedAge = null; // .age のボタンで受け取った値（ディスプレイには出さない）

    function updateDisplay() {
        const display = document.getElementById('display');
        if (display) {
            display.value = current;
        }
    }

    // .age 内のボタン：値だけ受け取り、ディスプレイには表示しない
    document.querySelectorAll('.age button[data-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            selectedAge = this.getAttribute('data-value');
            // ディスプレイは更新しない
        });
    });

    // .buttons 内のボタン：従来どおりディスプレイに表示
    document.querySelectorAll('.buttons button[data-value]').forEach(function (btn) {
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
                } else if (value === '0') {
                    // 0レジ：0を続けて打つと 0 → 00 → 000 … と連番
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

    updateDisplay();
});
