<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Seven / Hello</title>
    <link rel="stylesheet" href="{{ asset('css/seven.css') }}">
</head>
<body>


    <div class="calculator">
        <textarea class="display" id="display" readonly>0</textarea>

        <div class="buttons">
            <button class="clear" data-value="C">C</button>
            <button data-value="責任者解除">責任者解除</button>

            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>
            <button class="operator" data-value="+">+</button>

            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>

            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button class="zero" data-value="0">0</button>
        </div>
    </div>

    <script src="{{ asset('js/seven.js') }}"></script>
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

