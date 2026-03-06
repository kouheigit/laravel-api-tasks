@php
    $title = '公共料金トレーニングシナリオ選択';
@endphp

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-100 min-h-screen flex items-center justify-center">
<div class="max-w-4xl w-full bg-white shadow-xl rounded-xl p-8 space-y-6">
    <header class="flex items-center justify-between border-b pb-4">
        <div>
            <h1 class="text-2xl font-bold text-slate-800">{{ $title }}</h1>
            <p class="text-sm text-slate-500 mt-1">
                公共料金・自動車税などのシナリオを選択します。（TRN-P-01）
            </p>
        </div>
        <a href="{{ route('training.top') }}" class="text-sm text-indigo-600 hover:underline">
            ← トレーニングTOPへ戻る
        </a>
    </header>

    <section class="space-y-4">
        @forelse($scenarios as $scenario)
            <form method="POST"
                  action="{{ route('training.start', ['scenario' => $scenario->id]) }}"
                  class="border border-slate-200 rounded-lg p-4 flex items-center justify-between hover:border-emerald-500 transition">
                @csrf
                <div>
                    <p class="text-xs font-mono text-slate-400">{{ $scenario->scenario_id }}</p>
                    <h2 class="text-lg font-semibold text-slate-800">{{ $scenario->scenario_name }}</h2>
                    <p class="text-xs text-slate-500 mt-1">
                        枚数: {{ $scenario->bill_count ?? '-' }} / 種別: {{ $scenario->bill_type ?? '-' }} /
                        ガイド: {{ $scenario->guide_level }}
                    </p>
                </div>
                <button type="submit"
                        class="px-4 py-2 text-sm font-semibold rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
                    開始
                </button>
            </form>
        @empty
            <p class="text-sm text-slate-500">
                登録されている公共料金シナリオがありません。
            </p>
        @endforelse
    </section>
</div>
</body>
</html>

