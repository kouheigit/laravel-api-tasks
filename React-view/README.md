# React View - Laravel × React アプリケーション

Laravel API と連携する独立した React アプリケーションです。

## 特徴

- 🚀 Create React App ベースの最新 React 環境
- 🎨 モダンな UI デザイン
- 🔗 Laravel API との連携機能
- 📱 レスポンシブデザイン
- ⚡ 高速な開発体験

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm start
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 利用可能なスクリプト

### `npm start`
開発モードでアプリケーションを起動します。
- ホットリロード機能付き
- エラー表示とデバッグ情報

### `npm test`
テストランナーを起動します。
- インタラクティブウォッチモード
- カバレッジレポート

### `npm run build`
本番用にアプリケーションをビルドします。
- 最適化されたバンドル
- ファイル名にハッシュ付与
- 本番デプロイ準備完了

### `npm run eject`
**注意: この操作は元に戻せません！**

ビルドツールと設定を完全にカスタマイズしたい場合に使用します。

## プロジェクト構造

```
React-view/
├── public/                 # 静的ファイル
│   ├── index.html         # HTML テンプレート
│   └── favicon.ico        # ファビコン
├── src/                   # ソースコード
│   ├── App.js             # メインアプリケーション
│   ├── App.css            # スタイルシート
│   ├── index.js           # エントリーポイント
│   └── services/          # API サービス
│       └── api.js         # Laravel API 連携
├── config.js              # アプリケーション設定
├── package.json           # 依存関係とスクリプト
└── README.md              # このファイル
```

## Laravel API との連携

### API サービスの使用例

```javascript
import apiService from './services/api';

// タスク一覧を取得
const tasks = await apiService.getTasks();

// 新しいタスクを作成
const newTask = await apiService.createTask({
  title: '新しいタスク',
  description: 'タスクの説明'
});

// タスクを更新
const updatedTask = await apiService.updateTask(1, {
  title: '更新されたタスク'
});

// タスクを削除
await apiService.deleteTask(1);
```

### 設定のカスタマイズ

`config.js` ファイルで API URL やその他の設定を変更できます：

```javascript
export const config = {
  apiUrl: 'http://localhost:8000/api',  // Laravel API の URL
  appName: 'React View',
  version: '1.0.0'
};
```

## 開発ガイド

### 新しいコンポーネントの追加

1. `src/components/` ディレクトリに新しいコンポーネントファイルを作成
2. コンポーネントを `App.js` にインポートして使用

### スタイリング

- CSS Modules または styled-components を使用可能
- 既存の `App.css` を参考にスタイルを追加

### 状態管理

- 現在は React の `useState` を使用
- より複雑な状態管理が必要な場合は Redux や Zustand を検討

## デプロイ

### 本番ビルド

```bash
npm run build
```

`build/` ディレクトリに最適化されたファイルが生成されます。

### 静的ファイルサーバーでの配信

```bash
# serve パッケージを使用
npx serve -s build

# または他の静的ファイルサーバー
# Apache, Nginx, Netlify, Vercel など
```

## トラブルシューティング

### よくある問題

1. **ポートが使用中**
   - 別のポートで起動: `PORT=3001 npm start`

2. **API 接続エラー**
   - Laravel サーバーが起動しているか確認
   - CORS 設定を確認

3. **依存関係のエラー**
   - `rm -rf node_modules package-lock.json && npm install`

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 貢献

プルリクエストやイシューの報告を歓迎します！