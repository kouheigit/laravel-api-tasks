<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>TodoUser Login</title>
</head>
<body>
<h2>TodoUser ログイン</h2>
<p>未登録の場合は下のページから登録</p>
<b><a href="{{ route('member.registration') }}">登録する</a></b>
@if($errors->any())
    <div>
        <ul>
            @foreach($errors->all() as $error)
                <li style="color:red">{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
<form method="POST" action="{{route('member.login')}}">
    @csrf
    <div>
        <label>Email:</label>
        <input type="email" name="email" value="{{old('email')}}">
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password">
    </div>
    <button type="submit">ログイン</button>
</form>
</body>
</html>
