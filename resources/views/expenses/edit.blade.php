<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExpenseBoard 支出編集</title>
    <style>
        body {
            font-family: sans-serif;
            max-width: 760px;
            margin: 40px auto;
            padding: 0 16px;
            line-height: 1.6;
        }
        label {
            display: block;
            margin-top: 16px;
            font-weight: bold;
        }
        input, textarea, select {
            width: 100%;
            padding: 10px;
            margin-top: 8px;
            box-sizing: border-box;
        }
        .errors {
            padding: 12px;
            background: #fff5f5;
            border: 1px solid #f1aeb5;
            margin-bottom: 20px;
        }
        .actions {
            margin-top: 24px;
            display: flex;
            gap: 12px;
        }
        .button-link,
        button {
            display: inline-block;
            padding: 8px 12px;
            border: 1px solid #333;
            background: #fff;
            color: #111;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>ExpenseBoard 支出編集</h1>

    @if ($errors->any())
        <div class="errors">
            <strong>入力内容を確認してください。</strong>
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('expenses.update', $expense) }}" method="POST">
        @csrf
        @method('PUT')

        <label for="category_id">カテゴリ</label>
        <select id="category_id" name="category_id" required>
            <option value="">選択してください</option>
            @foreach ($categories as $category)
                <option value="{{ $category->id }}" @selected(old('category_id', $expense->category_id) == $category->id)>{{ $category->name }}</option>
            @endforeach
        </select>

        <label for="spent_on">日付</label>
        <input type="date" id="spent_on" name="spent_on" value="{{ old('spent_on', $expense->spent_on) }}" required>

        <label for="title">タイトル</label>
        <input type="text" id="title" name="title" value="{{ old('title', $expense->title) }}" maxlength="255" required>

        <label for="amount">金額</label>
        <input type="number" id="amount" name="amount" value="{{ old('amount', $expense->amount) }}" min="1" required>

        <label for="memo">メモ</label>
        <textarea id="memo" name="memo" rows="5">{{ old('memo', $expense->memo) }}</textarea>

        <div class="actions">
            <button type="submit">更新</button>
            <a href="{{ route('expenses.show', $expense) }}" class="button-link">詳細へ戻る</a>
        </div>
    </form>
</body>
</html>
