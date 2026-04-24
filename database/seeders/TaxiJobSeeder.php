<?php

namespace Database\Seeders;

use App\Models\TaxiJob;
use Illuminate\Database\Seeder;

class TaxiJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TaxiJob::factory()->count(12)->create();

        TaxiJob::query()->create([
            'slug' => 'tokyo-premium-night-driver',
            'company_name' => '東京プレミアムキャブ',
            'title' => '夜勤ハイヤードライバー',
            'employment_type' => '正社員',
            'prefecture' => '東京都',
            'city' => '港区',
            'station' => '品川駅',
            'vehicle_type' => 'アルファード',
            'shift_type' => '夜勤',
            'experience_level' => '未経験歓迎',
            'salary_min' => 420000,
            'salary_max' => 780000,
            'salary_label' => '月給',
            'day_shift_ratio' => 30,
            'night_shift_ratio' => 70,
            'match_score' => 97,
            'open_positions' => 6,
            'average_monthly_holidays' => 9,
            'tags' => ['入社祝い金', '給与保障', 'ハイヤー案件', '駅近営業所'],
            'benefits' => [
                '6ヶ月間の給与保障あり',
                '引越し補助あり',
                '二種免許取得支援',
                '事故負担金なし',
            ],
            'requirements' => [
                '普通自動車免許取得後1年以上',
                '深夜勤務が可能なこと',
                '接客品質を重視できること',
            ],
            'catch_copy' => '法人送迎と予約案件中心で高単価を狙える夜勤ポジション。',
            'description' => '都心の法人利用と空港送迎を中心に担当します。流し営業依存を下げ、予約案件を軸に売上を構築できる設計です。',
            'training_program' => '接遇研修、夜間運行の安全講習、同乗OJTを段階的に実施します。',
            'application_flow' => 'Web応募、面談、職場見学、内定、入社書類案内の順です。',
            'application_url' => 'https://example.com/taxi-jobs/tokyo-premium-night-driver',
            'contact_phone' => '03-7777-1111',
            'is_featured' => true,
            'is_active' => true,
            'published_at' => now()->subDays(2),
        ]);
    }
}
