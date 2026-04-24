# バックエンド関連ファイル説明

## `app/Models/TaxiJob.php`
求人データを表す Eloquent モデル。検索対象のカラム、JSONキャスト、公開済み求人だけを絞る `published` スコープ、slug ルーティングを定義している。

## `app/Http/Controllers/TaxiJobController.php`
求人一覧と詳細画面を返すコントローラ。`index` で検索条件を受け取り、一覧・注目求人・絞り込み候補を Blade に渡す。`show` で詳細と関連求人を返す。

## `database/migrations/2026_04_24_003846_create_taxi_jobs_table.php`
`taxi_jobs` テーブルを作成するマイグレーション。求人検索に必要な基本情報、給与、タグ、福利厚生、応募情報などを保持する。

## `database/factories/TaxiJobFactory.php`
テスト用および Seeder 用のダミー求人データ生成定義。地域、給与帯、タグ、勤務帯などをランダムで生成する。

## `database/seeders/TaxiJobSeeder.php`
一覧画面確認用のサンプル求人を投入する Seeder。ランダムデータに加えて、注目求人1件を固定値で追加している。

## `routes/web.php`
`/taxi-jobs` 一覧と `/taxi-jobs/{slug}` 詳細のルートを追加している。既存ルーティングの末尾に追記してある。
