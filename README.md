<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

# 📦 Laravel Task API - `laravel-api-tasks`

Laravelを用いて構築したRESTful Task管理APIです。  
タスクの一覧取得・検索・ページネーション・バリデーション・リソースレスポンスを実装済みです。

---

## 🚀 起動方法（Docker + Laravel Sail）

```bash
git clone https://github.com/<your-username>/laravel-api-tasks.git
cd laravel-api-tasks
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
