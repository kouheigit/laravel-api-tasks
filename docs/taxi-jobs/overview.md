# タクシー求人検索システム概要

## 目的
タクシー会社の求人を、地域・勤務帯・給与・車両タイプなどで検索できる専用画面を Laravel に追加した。

## 主要機能
- 求人一覧表示
- キーワード検索
- 都道府県、雇用形態、勤務帯、車両タイプ、最低月給での絞り込み
- 注目求人のハイライト表示
- 求人詳細ページ
- サンプルデータ投入用 Seeder / Factory
- 最低限の Feature テスト

## 画面URL
- `/taxi-jobs`
- `/taxi-jobs/{slug}`

## セットアップ
```bash
php artisan migrate
php artisan db:seed --class=TaxiJobSeeder
npm run build
```
