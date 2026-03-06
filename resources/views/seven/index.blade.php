<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Seven / Hello</title>
</head>
<body>
    hello
    {{ $message }}
    {{ $message1 }}

    <div class="calculator">
        <input type="text" class="display" id="display" value="0" readonly>

        <div class="buttons">
            <button class="clear" data-value="C">C</button>
            <button data-value="テスト">テスト</button>
            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>
            <button data-value="テスト">テスト</button>
            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>
            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button class="zero" data-value="0">0</button>
        </div>
    </div>

    <script>
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
    </script>
    {{--
    <form method="POST" action="{{ route('seven.store') }}">
        @csrf
        <button type="submit" name="number" value="1">1</button>
    </form>

    @if(!is_null($selectedNumber))
        <p>{{ $selectedNumber }}</p>
    @endif--}}
</body>
</html>

