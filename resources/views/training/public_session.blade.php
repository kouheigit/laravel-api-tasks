@php
    $title = '公共料金トレーニング（シナリオ: ' . $scenario->scenario_name . '）';
@endphp

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-slate-900 min-h-screen flex items-center justify-center">
<div class="max-w-4xl w-full bg-slate-950 text-slate-50 rounded-xl shadow-2xl p-6 space-y-4">
    <header class="flex items-center justify-between border-b border-slate-700 pb-2">
        <div>
            <p class="text-xs font-mono text-slate-400">TRN-P-02〜P-06 公共料金トレーニング画面</p>
            <h1 class="text-xl font-bold">{{ $scenario->scenario_name }}</h1>
            <p class="text-xs text-slate-400 mt-1">
                枚数想定: {{ $scenario->bill_count ?? '-' }} / 種別: {{ $scenario->bill_type ?? '-' }} /
                ガイド: {{ $scenario->guide_level }}
            </p>
        </div>
        <a href="{{ route('training.public.scenarios') }}" class="text-xs text-indigo-300 hover:underline">
            ← シナリオ一覧へ戻る
        </a>
    </header>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {{-- 左：枚数入力・バーコード読取フロー --}}
        <div class="space-y-3">
            <div class="bg-slate-900 border border-slate-700 rounded-lg p-3">
                <p class="text-xs font-mono text-slate-400 mb-2">TRN-P-02 枚数入力</p>
                <div class="flex items-center gap-2 text-sm">
                    <span>払込票枚数：</span>
                    <input type="number" min="1" max="10" value="{{ $scenario->bill_count ?? 1 }}"
                           class="w-20 px-2 py-1 rounded bg-slate-900 border border-slate-600 text-right">
                    <span>枚</span>
                </div>
                <p class="mt-1 text-xs text-slate-400">
                    ※ 実際のバリデーション（1〜10枚、読取数一致など）はサーバー側ロジックで拡張予定
                </p>
            </div>

            <div class="bg-slate-900 border border-slate-700 rounded-lg p-3">
                <p class="text-xs font-mono text-slate-400 mb-2">TRN-P-03 バーコード読取</p>
                <p class="text-xs text-slate-300 mb-2">
                    各払込票のバーコードを順に読み取る操作を想定したエリアです。
                </p>
                <ul class="text-xs text-slate-400 list-disc list-inside space-y-1">
                    <li>バーコード読取成功／失敗の判定</li>
                    <li>読取済み枚数と残り枚数の表示</li>
                    <li>E006 バーコード読取不足エラーの誘発など</li>
                </ul>
            </div>
        </div>

        {{-- 右：支払い確認・ストア印・控え仕分け --}}
        <div class="space-y-3">
            <div class="bg-slate-900 border border-slate-700 rounded-lg p-3">
                <p class="text-xs font-mono text-slate-400 mb-2">TRN-P-04 支払い確認（現金のみ）</p>
                <p class="text-xs text-slate-300 mb-2">
                    公共料金は原則 <span class="font-semibold text-emerald-400">現金のみ</span> です。
                    クレジットやバーコード決済を選択した場合は E005 エラーとなります。
                </p>
                <div class="flex gap-2 text-xs">
                    <button type="button"
                            class="px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600">
                        現金
                    </button>
                    <button type="button"
                            class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">
                        クレジット
                    </button>
                    <button type="button"
                            class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700">
                        バーコード決済
                    </button>
                </div>
            </div>

            <div class="bg-slate-900 border border-slate-700 rounded-lg p-3">
                <p class="text-xs font-mono text-slate-400 mb-2">TRN-P-05〜P-06 会計完了／ストア印・控え仕分け</p>
                <ul class="text-xs text-slate-300 list-disc list-inside space-y-1">
                    <li>支払い完了前押印で E007（重大ミス）を記録</li>
                    <li>お客様控え／店舗控えの仕分けミスで E008 を記録</li>
                    <li>自動車税は「右2枚＝お客様控え／左2枚＝店舗控え」をガイド表示</li>
                </ul>
            </div>
        </div>
    </section>

    {{-- 簡易的な評価入力（総合結果） --}}
    <section class="mt-4 border-t border-slate-700 pt-4">
        <p class="text-xs font-mono text-slate-400 mb-2">簡易評価入力（TRN-P-05 / TRN-P-06 / TRN-R-01 相当）</p>
        <form method="POST" action="{{ route('training.finish', ['result' => $result->id]) }}"
              class="flex flex-wrap items-end gap-4 text-sm">
            @csrf
            <div>
                <label class="block text-xs text-slate-300 mb-1">ミス回数</label>
                <input type="number" name="error_count" min="0" value="0"
                       class="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-50 text-right">
            </div>
            <div>
                <label class="block text-xs text-slate-300 mb-1">スコア（0〜100）</label>
                <input type="number" name="score" min="0" max="100" value="100"
                       class="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-50 text-right">
            </div>
            <div class="flex-1">
                <label class="block text-xs text-slate-300 mb-1">ミス内容メモ（任意）</label>
                <textarea name="error_details[notes]" rows="1"
                          class="w-full px-2 py-1 rounded bg-slate-900 border border-slate-600 text-slate-50 text-xs"></textarea>
            </div>
            <button type="submit"
                    class="px-4 py-2 rounded bg-emerald-600 text-sm font-semibold hover:bg-emerald-500">
                セッション終了 → 結果表示
            </button>
        </form>
    </section>
</div>
</body>
</html>

