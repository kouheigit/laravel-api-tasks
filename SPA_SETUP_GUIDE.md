# Laravel × React SPA構成（認証 + CRUD）セットアップガイド

## 🚀 セットアップ完了！

Laravel × React SPA構成の認証機能付きアプリケーションが完成しました。

## 📋 実装内容

### Laravel側（バックエンド）
- ✅ **UserAuthController**: 認証処理（ログイン・ログアウト・ユーザー情報取得）
- ✅ **BookController**: 書籍CRUD操作
- ✅ **APIルーティング**: 認証付きルートと非認証ルートの整理
- ✅ **CORS設定**: Reactフロントエンドとの通信設定
- ✅ **Sanctum設定**: クッキーセッション認証

### React側（フロントエンド）
- ✅ **useAuthフック**: 認証状態管理
- ✅ **Loginページ**: ログインフォーム
- ✅ **BookListページ**: 書籍一覧表示
- ✅ **認証付きルーティング**: ログイン状態による画面遷移制御
- ✅ **Axios設定**: Laravel APIとの通信設定

## 🛠️ 起動方法

### 1. Laravelサーバーの起動
```bash
cd /Users/user/Desktop/pgfile/laravel-curriculum/laravel-api-tasks
./vendor/bin/sail up -d
./vendor/bin/sail artisan serve --host=0.0.0.0 --port=8000
```

### 2. Reactサーバーの起動
```bash
cd /Users/user/Desktop/pgfile/laravel-curriculum/laravel-api-tasks/React-view
npm start
```

## 🔐 テスト用アカウント

- **メールアドレス**: `test@example.com`
- **パスワード**: `password`

## 📱 アクセス方法

1. **Reactアプリ**: http://localhost:3000
2. **Laravel API**: http://localhost:8000/api
3. **ログインページ**: http://localhost:3000/login

## 🎯 機能一覧

### 認証機能
- ログイン・ログアウト
- 認証状態の管理
- 認証が必要なページの保護

### 書籍管理機能
- 書籍一覧の表示
- ユーザー情報の表示
- ログアウト機能

## 🔧 設定ファイル

### .env設定例
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### CORS設定
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

## 📁 ファイル構成

```
laravel-api-tasks/
├── app/Http/Controllers/
│   ├── UserAuthController.php    # 認証処理
│   └── BookController.php        # 書籍CRUD
├── config/
│   └── cors.php                  # CORS設定
├── routes/
│   └── api.php                   # APIルーティング
└── React-view/src/
    ├── api/
    │   └── axios.js              # Axios設定
    ├── hooks/
    │   └── useAuth.js            # 認証フック
    ├── pages/
    │   ├── Login.jsx             # ログインページ
    │   └── BookList.jsx          # 書籍一覧ページ
    └── App.jsx                   # メインアプリ
```

## 🐛 トラブルシューティング

### よくある問題

1. **CORSエラー**
   - `config/cors.php`の設定を確認
   - `SANCTUM_STATEFUL_DOMAINS`の設定を確認

2. **認証エラー**
   - セッション設定を確認
   - クッキーのドメイン設定を確認

3. **API接続エラー**
   - Laravelサーバーが起動しているか確認
   - ポート番号（8000）が正しいか確認

## 🎉 完成！

これでLaravel × React SPA構成の認証機能付きアプリケーションが完成しました！

ログインして書籍一覧を確認してみてください。
