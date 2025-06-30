### GET /api/tasks

ステータスによる絞り込みとページネーションを備えたタスク一覧取得APIです。

#### クエリパラメータ

| パラメータ | 型     | 説明                         |
|------------|--------|------------------------------|
| status     | string | ステータスで絞り込み（例: done） |
| page       | int    | ページ番号（例: 1, 2, ...）     |

#### レスポンス例

```json
{
  "data": [
    {
      "id": 1,
      "title": "買い物",
      "description": "牛乳を買う",
      "status": "done",
      "category_id": 2,
      "user_id": 1
    }
  ],
  "meta": {
    "current_page": 1,
    "total": 12,
    ...
  },
  "links": {
    "next": "http://localhost:8061/api/tasks?page=2"
  }
}
