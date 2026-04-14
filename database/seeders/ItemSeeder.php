<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'name' => 'ノートA',
                'sku' => 'STK-001',
                'stock' => 20,
                'low_stock_threshold' => 5,
                'note' => '定番商品',
            ],
            [
                'name' => 'ボールペンB',
                'sku' => 'STK-002',
                'stock' => 0,
                'low_stock_threshold' => 3,
                'note' => '在庫切れサンプル',
            ],
        ];

        foreach ($items as $item) {
            Item::updateOrCreate(
                ['sku' => $item['sku']],
                $item
            );
        }
    }
}
