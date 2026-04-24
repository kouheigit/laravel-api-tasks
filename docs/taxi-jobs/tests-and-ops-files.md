# テスト・運用関連ファイル説明

## `tests/Feature/TaxiJobSearchTest.php`
求人一覧表示、都道府県絞り込み、slug での詳細表示を確認する Feature テスト。既存マイグレーション群に依存しないよう、テスト内で必要テーブルを直接組み立てている。

## 運用メモ
- 画面確認前に `php artisan db:seed --class=TaxiJobSeeder` を実行する。
- CSS 反映には `npm run dev` または `npm run build` が必要。
- 既存の作業ツリー変更は保持したまま、この機能を別系統で追加している。
