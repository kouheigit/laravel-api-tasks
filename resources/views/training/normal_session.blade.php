@php
    $title = '通常レジトレーニング（シナリオ: ' . $scenario->scenario_name . '）';
@endphp

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gradient-to-br from-emerald-900 via-slate-900 to-amber-900 min-h-screen flex items-center justify-center">
<div class="w-full max-w-6xl aspect-[16/9] bg-slate-950 text-slate-50 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] border-[12px] border-slate-800 flex flex-col p-4 space-y-3">
    <header class="flex items-center justify-between border-b border-slate-700 pb-1">
        <div>
            <p class="text-[10px] font-mono text-emerald-300">TRN-N-02 通常レジ画面</p>
            <h1 class="text-lg font-bold tracking-wide flex items-center gap-2">
                <span class="inline-flex items-center justify-center px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-semibold uppercase">
                    Training
                </span>
                <span>{{ $scenario->scenario_name }}</span>
            </h1>
            <p class="text-[11px] text-slate-300 mt-0.5">
                決済種別: {{ $scenario->payment_type }} / ガイド: {{ $scenario->guide_level }}
            </p>
        </div>
        <a href="{{ route('training.normal.scenarios') }}" class="text-[11px] text-emerald-200 hover:text-emerald-100 underline-offset-2 hover:underline">
            ← シナリオ一覧へ戻る
        </a>
    </header>

    {{-- 上部：POS表示エリア（レジ上部モニター風） --}}
    <section class="relative bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 shadow-inner">
        <div class="absolute inset-x-1 top-1 h-1 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 opacity-70"></div>
        <div class="mt-3 flex justify-between text-sm">
            <div class="flex-1 pr-4">
                <p class="text-[11px] font-mono text-emerald-300 mb-1">商品一覧</p>
                <div class="bg-slate-950/70 rounded-md border border-slate-700 px-3 py-2 h-24 overflow-hidden">
                    <ul class="space-y-0.5 text-[11px] text-slate-100">
                        <li>001  おにぎり（バーコード）　×1　¥120</li>
                        <li>002  ななチキ（ホットスナック）　×1　¥220</li>
                        <li class="text-slate-500">… 実装時はここに実際の登録商品を表示</li>
                    </ul>
                </div>
            </div>
            <div class="w-48 text-right">
                <p class="text-[11px] text-slate-300">小計</p>
                <p class="text-2xl font-bold text-emerald-400 tracking-widest">¥ 340</p>
                <p class="text-[11px] text-slate-300 mt-1">税込</p>
                <p class="text-lg font-semibold text-emerald-300 tracking-widest">¥ 340</p>
            </div>
        </div>
    </section>

    {{-- 下部：テンキー / 機能キー / カテゴリ --}}
    <section class="flex-1 grid grid-cols-3 gap-3 mt-2">
        {{-- 左：テンキー（実機テンキー風） --}}
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-inner">
            <p class="text-[11px] font-mono text-slate-300 mb-1">テンキー</p>
            <div class="grid grid-cols-3 gap-2">
                @foreach([7,8,9,4,5,6,1,2,3,0] as $num)
                    <button type="button"
                            class="py-2 text-lg font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 shadow text-slate-50">
                        {{ $num }}
                    </button>
                @endforeach
                <button type="button"
                        class="col-span-2 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-600 shadow text-amber-50">
                    ×（数量）
                </button>
                <button type="button"
                        class="py-2 text-sm rounded-lg bg-rose-800 hover:bg-rose-700 shadow text-rose-50">
                    C（クリア）
                </button>
            </div>
        </div>

        {{-- 中央：機能キー（レジ中央キー群風） --}}
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-inner">
            <p class="text-[11px] font-mono text-slate-300 mb-1">機能キー</p>
            <div class="grid grid-cols-2 gap-2">
                <button type="button"
                        class="py-2 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 shadow-lg text-emerald-50">
                    登録
                </button>
                <button type="button"
                        class="py-2 text-sm rounded-lg bg-sky-700 hover:bg-sky-600 shadow text-slate-50">
                    CG（客層）
                </button>
                <button type="button"
                        class="py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-600 shadow text-amber-50">
                    訂正
                </button>
                <button type="button"
                        class="py-2 text-sm rounded-lg bg-rose-700 hover:bg-rose-600 shadow text-rose-50">
                    取消
                </button>
                <button type="button"
                        class="py-2 text-sm rounded-lg bg-slate-800 hover:bg-slate-700 shadow text-slate-50">
                    保留
                </button>
                <button type="button"
                        class="py-2 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 shadow text-slate-50">
                    解除
                </button>
            </div>
        </div>

        {{-- 右：カテゴリ（タッチパネル風） --}}
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-inner">
            <p class="text-[11px] font-mono text-slate-300 mb-1">タッチパネルカテゴリ</p>
            <div class="grid grid-cols-2 gap-2 text-[11px]">
                @foreach(['ホットスナック','中華まん','セブンカフェ','新聞','袋','切手','おでん','その他商品'] as $label)
                    <button type="button"
                            class="py-2 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 shadow text-emerald-50">
                        {{ $label }}
                    </button>
                @endforeach
                <button type="button"
                        class="col-span-2 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 shadow text-amber-50 font-semibold">
                    支払い方法
                </button>
            </div>
        </div>
    </section>

    {{-- 簡易的な評価入力（実際の判定ロジックは今後拡張想定） --}}
    <section class="mt-4 border-t border-slate-700 pt-4">
        <p class="text-[11px] font-mono text-slate-300 mb-2">
            簡易評価入力（TRN-N-03 / TRN-R-01 相当）<br>
            ※ お試しとして「正しい決済方法が選べたか」を自動判定します。
        </p>
        <form method="POST" action="{{ route('training.finish', ['result' => $result->id]) }}"
              class="flex flex-wrap items-end gap-3 text-[11px]">
            @csrf
            <div>
                <label class="block text-[11px] text-slate-200 mb-1">自分が選んだ決済方法</label>
                <select name="chosen_payment_type"
                        class="w-40 px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-50">
                    <option value="">（選択してください）</option>
                    <option value="cash">現金</option>
                    <option value="credit">クレジット</option>
                    <option value="barcode">バーコード決済</option>
                    <option value="emoney">電子マネー</option>
                </select>
                <p class="text-[10px] text-slate-400 mt-1">
                    シナリオ上の正解: {{ $scenario->payment_type }}
                </p>
            </div>
            <div>
                <label class="block text-[11px] text-slate-200 mb-1">ミス回数</label>
                <input type="number" name="error_count" min="0" value="0"
                       class="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-50 text-right">
            </div>
            <div>
                <label class="block text-[11px] text-slate-200 mb-1">スコア（0〜100）</label>
                <input type="number" name="score" min="0" max="100" value="100"
                       class="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-50 text-right">
            </div>
            <div class="flex-1">
                <label class="block text-[11px] text-slate-200 mb-1">ミス内容メモ（任意）</label>
                <textarea name="error_details[notes]" rows="1"
                          class="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-50 text-[11px]"></textarea>
            </div>
            <button type="submit"
                    class="px-4 py-2 rounded-full bg-emerald-600 text-[12px] font-semibold hover:bg-emerald-500 shadow-lg">
                セッション終了 → 結果表示
            </button>
        </form>
    </section>
</div>
</body>
</html>

