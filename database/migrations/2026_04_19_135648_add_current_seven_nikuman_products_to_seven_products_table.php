<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $now = now();

        $products = [
            [
                'name' => 'ふんわり×ごろっと 肉まん',
                'price' => 156,
                'category' => '中華まん',
                'image_path' => null,
                'description' => '肉まん。全国販売。212kcal。セブン-イレブン公式の中華まん掲載商品。',
            ],
            [
                'name' => 'もちもち×ずっしり 大入り豚まん',
                'price' => 232,
                'category' => '中華まん',
                'image_path' => null,
                'description' => '肉まん。北海道、東北、関東、甲信越、北陸、東海、中国、四国、九州、沖縄で販売。340kcal。セブン-イレブン公式の中華まん掲載商品。',
            ],
            [
                'name' => 'もっちり×ジューシー 特製豚まん',
                'price' => 195,
                'category' => '中華まん',
                'image_path' => null,
                'description' => '肉まん。近畿限定販売。358kcal。セブン-イレブン公式の中華まん掲載商品。',
            ],
        ];

        foreach ($products as $product) {
            $exists = DB::table('seven_products')
                ->where('name', $product['name'])
                ->where('category', $product['category'])
                ->exists();

            if ($exists) {
                continue;
            }

            DB::table('seven_products')->insert([
                ...$product,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('seven_products')
            ->where('category', '中華まん')
            ->whereIn('name', [
                'ふんわり×ごろっと 肉まん',
                'もちもち×ずっしり 大入り豚まん',
                'もっちり×ジューシー 特製豚まん',
            ])
            ->delete();
    }
};
