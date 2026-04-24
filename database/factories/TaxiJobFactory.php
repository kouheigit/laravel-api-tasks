<?php

namespace Database\Factories;

use App\Models\TaxiJob;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TaxiJob>
 */
class TaxiJobFactory extends Factory
{
    protected $model = TaxiJob::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companies = [
            '日の出交通',
            '江戸キャブサービス',
            'みらいタクシー東京',
            '首都圏プレミアム交通',
            '空港アクセスモビリティ',
            '横浜ベイタクシー',
        ];

        $prefectureCityPairs = [
            ['東京都', '江東区', '豊洲駅'],
            ['東京都', '足立区', '北千住駅'],
            ['東京都', '大田区', '蒲田駅'],
            ['神奈川県', '横浜市', '関内駅'],
            ['千葉県', '船橋市', '西船橋駅'],
            ['埼玉県', 'さいたま市', '大宮駅'],
        ];

        [$prefecture, $city, $station] = fake()->randomElement($prefectureCityPairs);
        $salaryMin = fake()->numberBetween(320000, 480000);
        $salaryMax = $salaryMin + fake()->numberBetween(120000, 280000);
        $employmentType = fake()->randomElement(['正社員', '契約社員', '夜勤専門', '隔日勤務']);
        $vehicleType = fake()->randomElement(['ジャパンタクシー', 'アルファード', 'ハイヤー', '福祉車両']);
        $shiftType = fake()->randomElement(['日勤', '夜勤', '隔日勤務']);
        $experienceLevel = fake()->randomElement(['未経験歓迎', '二種免許保有者優遇', '観光経験者歓迎']);
        $company = fake()->randomElement($companies);
        $title = sprintf('%sドライバー', $shiftType);

        return [
            'slug' => fake()->unique()->slug(4),
            'company_name' => $company,
            'title' => $title,
            'employment_type' => $employmentType,
            'prefecture' => $prefecture,
            'city' => $city,
            'station' => $station,
            'vehicle_type' => $vehicleType,
            'shift_type' => $shiftType,
            'experience_level' => $experienceLevel,
            'salary_min' => $salaryMin,
            'salary_max' => $salaryMax,
            'salary_label' => '月給',
            'day_shift_ratio' => fake()->numberBetween(20, 80),
            'night_shift_ratio' => fake()->numberBetween(20, 80),
            'match_score' => fake()->numberBetween(78, 98),
            'open_positions' => fake()->numberBetween(2, 18),
            'average_monthly_holidays' => fake()->numberBetween(6, 11),
            'tags' => fake()->randomElements([
                '入社祝い金',
                '給与保障',
                '寮あり',
                'GO対応',
                '観光送迎',
                '空港定額',
                '女性活躍',
                '未経験OK',
            ], fake()->numberBetween(3, 5)),
            'benefits' => [
                '二種免許取得費用を会社負担',
                '研修期間中も日当支給',
                '社会保険完備',
                '制服貸与',
            ],
            'requirements' => [
                '普通自動車免許取得後1年以上',
                '接客を前向きに学べること',
                '深夜帯勤務に対応可能なこと',
            ],
            'catch_copy' => fake()->randomElement([
                '未経験から3ヶ月で安定売上を目指せる研修設計。',
                '空港送迎とアプリ配車の両輪で収入を組み立てる求人。',
                '住宅支援付きで地方からの転職にも対応。',
            ]),
            'description' => 'アプリ配車、無線配車、法人契約を組み合わせて安定的に営業できるドライバー求人です。教育担当が乗務開始後も同乗フォローを行い、売上の立ち上がりを支援します。',
            'training_program' => '初任研修、地理研修、同乗研修、営業分析面談を4週間単位で実施します。',
            'application_flow' => '応募後に電話確認、面接1回、健康診断、内定、養成または研修開始の流れです。',
            'application_url' => 'https://example.com/taxi-jobs/apply',
            'contact_phone' => '03-1234-5678',
            'is_featured' => fake()->boolean(35),
            'is_active' => true,
            'published_at' => now()->subDays(fake()->numberBetween(0, 30)),
        ];
    }
}
