@php
    $title = 'トレーニングモードTOP';
@endphp

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-100 min-h-screen flex items-center justify-center">
<div class="max-w-3xl w-full bg-white shadow-xl rounded-xl p-8 space-y-8">
    <header class="border-b pb-4">
        <h1 class="text-2xl font-bold text-slate-800">{{ $title }}</h1>
        <p class="text-sm text-slate-500 mt-2">
            通常会計トレーニングと公共料金トレーニングを選択してください。
        </p>
    </header>

    <main class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="{{ route('training.normal.scenarios') }}"
           class="block border border-slate-200 rounded-lg p-6 hover:border-indigo-500 hover:shadow-lg transition bg-indigo-50">
            <h2 class="text-xl font-semibold text-indigo-700 mb-2">通常会計トレーニング</h2>
            <p class="text-sm text-slate-600">
                商品登録・ホットスナック・中華まん・セブンカフェ・各種決済の操作を練習します。
            </p>
        </a>

        <a href="{{ route('training.public.scenarios') }}"
           class="block border border-slate-200 rounded-lg p-6 hover:border-emerald-500 hover:shadow-lg transition bg-emerald-50">
            <h2 class="text-xl font-semibold text-emerald-700 mb-2">公共料金トレーニング</h2>
            <p class="text-sm text-slate-600">
                公共料金払込票の受付、自動車税、ストア印・控え仕分けのルールを練習します。
            </p>
        </a>
    </main>
</div>
</body>
</html>

