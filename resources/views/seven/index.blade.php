<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Seven / Hello</title>
    <link rel="stylesheet" href="{{ asset('css/seven.css') }}">
</head>
<body>
<div>
    <button data-value="中華まん">中華まん</button>
    <button data-value="ホットスナック">8</button>
</div>

    <div class="calculator">
        <textarea class="display" id="display" readonly>0</textarea>
        <div class="buttons">
            <button class="clear" data-value="C">C</button>
            <button data-value="7">7</button>
            <button data-value="8">8</button>
            <button data-value="9">9</button>
            <button data-value="4">4</button>
            <button data-value="5">5</button>
            <button data-value="6">6</button>
            <button data-value="1">1</button>
            <button data-value="2">2</button>
            <button data-value="3">3</button>
            <button class="zero" data-value="0">0</button>
            <button class="zero" data-value="00">00</button>
            <button data-value="責任者解除">責任者解除</button>
        </div>
        <div class="age">
            <button data-value="12">12</button>
            <button data-value="19">19</button>
            <button data-value="29">29</button>
            <button data-value="49">49</button>
            <button data-value="50">50</button>
        </div>
        <div class="age-w">
            <button data-value="12">12</button>
            <button data-value="19">19</button>
            <button data-value="29">29</button>
            <button data-value="49">49</button>
            <button data-value="50">50</button>
            <button data-value="リピート">登録/リピート</button>
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

