# TaskItemV2 追加ファイル一覧

このドキュメントは、今回“新規作成”したファイルのみを列挙します（既存ファイルの編集は含みません）。

## モデル
- app/Models/TaskItemV2.php
  - V2 タスク本体モデル。カテゴリ/ユーザーとのリレーション、期日超過判定を含む。
- app/Models/TaskCategoryV2.php
  - V2 カテゴリモデル。TaskItemV2 との 1:N。

## マイグレーション
- database/migrations/2025_09_22_000001_create_task_category_v2s_table.php
  - `task_category_v2s` テーブルを作成。
- database/migrations/2025_09_22_000002_create_task_item_v2s_table.php
  - `task_item_v2s` テーブルを作成。`user_id + title` ユニーク、SoftDeletes など。

## フォームリクエスト（バリデーション）
- app/Http/Requests/StoreTaskItemV2Request.php
  - 作成用。必須/型/範囲/存在チェックを定義。
- app/Http/Requests/UpdateTaskItemV2Request.php
  - 更新用。部分更新を許容。

## リソース
- app/Http/Resources/TaskItemV2Resource.php
  - 単体/コレクションのシリアライズ形式を定義。

## コントローラー
- app/Http/Controllers/TaskItemV2Controller.php
  - RESTful (index, store, show, update, destroy)。ソート/ページネーション対応。

## ルート
- routes/api.php（追記）
  - `Route::apiResource('task-item-v2s', TaskItemV2Controller::class);` を `auth:sanctum` グループ内に追加。

## ドキュメント
- doc/TaskItemV2.md
  - 仕様・使い方の詳細版。
- doc/TaskItemV2_QuickStart.md
  - 最短手順に特化したクイックスタート。
