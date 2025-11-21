<html>
<body>
<header>
    <nav>
        <a href="{{ route('todo.dashboard') }}">ダッシュボード</a>
        <a href="{{ route('todo.index') }}">一覧</a>
        <a href="{{ route('todo.create') }}">作成</a>
    </nav>
</header>
<main>
    <div class="content">
        @yield('content')
    </div>
</main>
<footer>
</footer>
</body>
</html>



