# フロントエンド関連ファイル説明

## `resources/views/taxi-jobs/index.blade.php`
求人一覧ページ本体。ヒーローエリア、検索フォーム、注目求人、カード一覧、ページネーションをまとめている。

## `resources/views/taxi-jobs/show.blade.php`
求人詳細ページ。給与レンジ、勤務地、応募条件、福利厚生、研修内容、関連求人を表示する。

## `resources/views/taxi-jobs/_card.blade.php`
一覧カードの部分テンプレート。会社名、給与、タグ、勤務情報、詳細リンクをコンパクトに表示する。

## `resources/css/app.css`
既存 Tailwind 読み込みに加え、タクシー求人画面向けの配色、背景、カード、ガラス風UI、アクセント装飾のカスタムCSSを追加している。
