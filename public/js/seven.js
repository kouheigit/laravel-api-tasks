document.addEventListener('DOMContentLoaded', function () {
    let current = '0';
    let selectedAge = null;
    let isUnlockMode = true; // 最初は数値入力モード（責任者解除で計算画面へ）

    var displayUnlockRow = document.getElementById('displayUnlockRow');
    var displayCalcArea = document.getElementById('displayCalcArea');
    var unlockInput = document.getElementById('unlockInput');

    function updateDisplay() {
        const display = document.getElementById('display');
        if (display) {
            display.value = current;
        }
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
            selectedAge = this.getAttribute('data-value');
        });
    });

    // .buttons 内のボタン
    document.querySelectorAll('.buttons button[data-value]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            // 責任者解除：下のボタン欄で押したら計算画面に切り替え
            if (value === '責任者解除') {
                if (isUnlockMode && displayUnlockRow && displayCalcArea) {
                    isUnlockMode = false;
                    displayUnlockRow.style.display = 'none';
                    displayCalcArea.style.display = 'flex';
                } else if (!isUnlockMode) {
                    // 計算画面では責任者解除は何もしない（またはロック戻しにすることも可）
                }
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
