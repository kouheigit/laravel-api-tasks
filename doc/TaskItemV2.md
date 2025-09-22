# TaskItemV2 API ドキュメント

## 追加ファイル一覧

- app/Models/TaskItemV2.php
- app/Models/TaskCategoryV2.php
- database/migrations/2025_09_22_000001_create_task_category_v2s_table.php
- database/migrations/2025_09_22_000002_create_task_item_v2s_table.php
- app/Http/Requests/StoreTaskItemV2Request.php
- app/Http/Requests/UpdateTaskItemV2Request.php
- app/Http/Resources/TaskItemV2Resource.php
- app/Http/Controllers/TaskItemV2Controller.php
- routes/api.php（`task-item-v2s` を追記）

## モデル概要

- TaskItemV2
  - フィールド: title, content, status(App\\Enums\\TaskStatus), due_date(date), priority(1..5, default 3), task_category_v2_id(nullable), user_id
  - リレーション: `category()` → TaskCategoryV2, `user()` → User
  - ユーティリティ: `isOverdue()` 期限切れ判定
- TaskCategoryV2
  - フィールド: name
  - リレーション: `taskItems()` → TaskItemV2（外部キー: task_category_v2_id）

## マイグレーション

- task_category_v2s
  - id, name, timestamps
- task_item_v2s
  - id, title, content, status(string), due_date(date), priority(tinyint, default 3)
  - task_category_v2_id → `task_category_v2s.id`（nullable, ON DELETE SET NULL）
  - user_id → `users.id`（ON DELETE CASCADE）
  - softDeletes, unique(user_id, title)

実行手順:

```bash
php artisan migrate | cat
```

## ルーティング

- `routes/api.php` の `auth:sanctum` グループ内に追加
- エンドポイント: `/api/task-item-v2s`

## 認証（Sanctum）

1) ログインしてトークンを取得
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"your-password"}'
```
2) 以降は `Authorization: Bearer <token>` を付与

## エンドポイント仕様

### 一覧: GET /api/task-item-v2s
- クエリ: `?page=1`、`?sort=priority|due_date|created_at`
```bash
curl "http://localhost:8000/api/task-item-v2s?sort=due_date&page=1" \
  -H "Authorization: Bearer <token>"
```

### 作成: POST /api/task-item-v2s
- バリデーション
  - title: required|string|max:255
  - content: required|string
  - status: required|enum(App\\Enums\\TaskStatus)
  - due_date: required|date|after_or_equal:today
  - priority: integer|min:1|max:5
  - task_category_v2_id: nullable|exists:task_category_v2s,id
```bash
curl -X POST http://localhost:8000/api/task-item-v2s \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "V2のタスク",
    "content": "説明文です",
    "status": "Todo",
    "due_date": "2025-09-30",
    "priority": 3,
    "task_category_v2_id": null
  }'
```

### 取得: GET /api/task-item-v2s/{id}
```bash
curl http://localhost:8000/api/task-item-v2s/1 \
  -H "Authorization: Bearer <token>"
```

### 更新: PUT /api/task-item-v2s/{id}
- 任意項目のみ送信可（指定時に検証）
```bash
curl -X PUT http://localhost:8000/api/task-item-v2s/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "InProgress",
    "priority": 5
  }'
```

### 削除: DELETE /api/task-item-v2s/{id}
```bash
curl -X DELETE http://localhost:8000/api/task-item-v2s/1 \
  -H "Authorization: Bearer <token>"
```

## レスポンス例（単体）
```json
{
  "id": 1,
  "title": "V2のタスク",
  "content": "説明文です",
  "status": "Todo",
  "is_overdue": false,
  "due_date": "2025-09-30",
  "priority": 3,
  "category": null,
  "user": "ユーザー名",
  "created_at": "2025-09-22 10:00:00"
}
```

## 注意点
- 同一ユーザー内で `title` はユニーク（`user_id + title`）。
- 日付は `YYYY-MM-DD`。`today` 以前はエラー。
- カテゴリを使う場合は `task_category_v2s` に事前登録し、その `id` を `task_category_v2_id` へ指定。


