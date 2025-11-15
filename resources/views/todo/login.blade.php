<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>TodoUser Login</title>
</head>
<body>
<h2>TodoUser ログイン</h2>
@if($errors->any())
    <div>
        <ul>
            @foreach($errors->all() as $error)
                <li style="color:red">{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
<form method="POST" action="{{route('todo.login')}}">
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

