<html>
<body>
<header>
    <nav>
        <a href="{{ route('admin.dashboard') }}">ダッシュボード</a>
        <a href="{{ route('admin.index') }}">一覧</a>
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



