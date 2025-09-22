# TaskItemV2 クイックスタート

このドキュメントは最短手順だけを抜粋しています。詳細は doc/TaskItemV2.md を参照してください。

## 前提
- 認証: auth:sanctum
- ベースURL例: http://localhost:8000

## 1) マイグレーション
```bash
php artisan migrate | cat
```

## 2) ログインしてトークン取得
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"your-password"}'
```
- 返却: { "token": "xxxxx" }
- 以降は全APIで -H "Authorization: Bearer xxxxx" を付与

## 3) 作成 (POST /api/task-item-v2s)
```bash
curl -X POST http://localhost:8000/api/task-item-v2s \
  -H "Authorization: Bearer xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "V2のタスク",
    "content": "説明文",
    "status": "Todo",
    "due_date": "2025-09-30",
    "priority": 3,
    "task_category_v2_id": null
  }'
```
必須: title, content, status(App\\Enums\\TaskStatus), due_date(今日以降)

## 4) 一覧 (GET /api/task-item-v2s)
```bash
curl "http://localhost:8000/api/task-item-v2s?sort=due_date&page=1" \
  -H "Authorization: Bearer xxxxx"
```

## 5) 詳細 (GET /api/task-item-v2s/{id})
```bash
curl http://localhost:8000/api/task-item-v2s/1 \
  -H "Authorization: Bearer xxxxx"
```

## 6) 更新 (PUT /api/task-item-v2s/{id})
```bash
curl -X PUT http://localhost:8000/api/task-item-v2s/1 \
  -H "Authorization: Bearer xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "InProgress",
    "priority": 5
  }'
```

## 7) 削除 (DELETE /api/task-item-v2s/{id})
```bash
curl -X DELETE http://localhost:8000/api/task-item-v2s/1 \
  -H "Authorization: Bearer xxxxx"
```

## 補足
- title は同一ユーザー内でユニーク
- due_date は YYYY-MM-DD、当日以前はエラー
- カテゴリを使う場合は task_category_v2s に事前登録し、その id を task_category_v2_id へ指定
