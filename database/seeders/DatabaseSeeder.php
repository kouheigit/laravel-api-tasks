<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\TrainingScenario;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('test-password'),
        ]);

        $this->call([
            CategorySeeder::class,
            ItemSeeder::class,
            TodoDummySeeder::class,
        ]);

        $this->seedTrainingScenarios();
    }

    protected function seedTrainingScenarios(): void
    {
        if (TrainingScenario::query()->exists()) {
            return;
        }

        $scenarios = [
            [
                'scenario_id' => 'N-CASH-01',
                'mode_type' => 'normal',
                'scenario_name' => '現金払い基本',
                'payment_type' => 'cash',
                'target_items' => [
                    ['type' => 'barcode', 'code' => '490000000001', 'name' => 'おにぎり', 'price' => 120],
                ],
                'bill_count' => null,
                'bill_type' => null,
                'allow_only_cash' => false,
                'guide_level' => 'beginner',
            ],
            [
                'scenario_id' => 'N-CREDIT-01',
                'mode_type' => 'normal',
                'scenario_name' => 'クレジット払い基本',
                'payment_type' => 'credit',
                'target_items' => [
                    ['type' => 'hot_snack', 'code' => 'HS-01', 'name' => 'ななチキ', 'price' => 220],
                ],
                'bill_count' => null,
                'bill_type' => null,
                'allow_only_cash' => false,
                'guide_level' => 'beginner',
            ],
            [
                'scenario_id' => 'P-BILL-1',
                'mode_type' => 'public_payment',
                'scenario_name' => '公共料金（1枚）',
                'payment_type' => 'public_cash',
                'target_items' => [],
                'bill_count' => 1,
                'bill_type' => 'normal',
                'allow_only_cash' => true,
                'guide_level' => 'beginner',
            ],
            [
                'scenario_id' => 'P-CAR-TAX',
                'mode_type' => 'public_payment',
                'scenario_name' => '自動車税',
                'payment_type' => 'public_cash',
                'target_items' => [],
                'bill_count' => 1,
                'bill_type' => 'car_tax',
                'allow_only_cash' => true,
                'guide_level' => 'normal',
            ],
        ];

        foreach ($scenarios as $scenario) {
            TrainingScenario::create($scenario);
        }
    }
}
