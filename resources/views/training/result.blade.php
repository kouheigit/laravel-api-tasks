@php
    $title = 'トレーニング結果';
@endphp

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-100 min-h-screen flex items-center justify-center">
<div class="max-w-3xl w-full bg-white shadow-xl rounded-xl p-8 space-y-6">
    <header class="border-b pb-4">
        <p class="text-xs font-mono text-slate-400">TRN-R-01 総合結果画面</p>
        <h1 class="text-2xl font-bold text-slate-800">{{ $title }}</h1>
        <p class="text-sm text-slate-500 mt-1">
            シナリオ「{{ $scenario->scenario_name }}」（{{ $scenario->scenario_id }}）の結果です。
        </p>
    </header>

    <section class="grid grid-cols-2 gap-4">
        <div class="border border-slate-200 rounded-lg p-4">
            <h2 class="text-sm font-semibold text-slate-700 mb-2">スコア</h2>
            <p class="text-4xl font-bold text-emerald-500">
                {{ $result->score }}<span class="text-xl text-slate-400"> / 100</span>
            </p>
            <p class="text-xs text-slate-500 mt-2">
                ミス回数：{{ $result->error_count }} 回
            </p>
        </div>

        <div class="border border-slate-200 rounded-lg p-4">
            <h2 class="text-sm font-semibold text-slate-700 mb-2">時間</h2>
            <p class="text-xs text-slate-500">
                開始：{{ optional($result->started_at)->format('Y-m-d H:i:s') ?? '-' }}<br>
                終了：{{ optional($result->ended_at)->format('Y-m-d H:i:s') ?? '-' }}
            </p>
        </div>
    </section>

    <section class="border border-slate-200 rounded-lg p-4">
        <h2 class="text-sm font-semibold text-slate-700 mb-2">ミス内容</h2>
        @php
            $details = $result->error_details ?? [];
        @endphp
        @if(!empty($details['notes']))
            <p class="text-sm text-slate-700 whitespace-pre-line">
                {{ $details['notes'] }}
            </p>
        @else
            <p class="text-sm text-slate-500">
                ミス内容は記録されていません。
            </p>
        @endif
    </section>

    <footer class="flex items-center justify-between pt-2 border-t">
        <a href="{{ route('training.top') }}"
           class="text-sm text-slate-600 hover:underline">
            トレーニングTOPへ戻る
        </a>
        <div class="space-x-2">
            @if($scenario->mode_type === 'normal')
                <a href="{{ route('training.normal.scenarios') }}"
                   class="px-3 py-1 text-sm rounded border border-slate-300 text-slate-700 hover:bg-slate-50">
                    通常会計シナリオ一覧へ
                </a>
            @else
                <a href="{{ route('training.public.scenarios') }}"
                   class="px-3 py-1 text-sm rounded border border-slate-300 text-slate-700 hover:bg-slate-50">
                    公共料金シナリオ一覧へ
                </a>
            @endif
            <form method="POST"
                  action="{{ route('training.start', ['scenario' => $scenario->id]) }}"
                  class="inline">
                @csrf
                <button type="submit"
                        class="px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700">
                    同じシナリオで再挑戦
                </button>
            </form>
        </div>
    </footer>
</div>
</body>
</html>

