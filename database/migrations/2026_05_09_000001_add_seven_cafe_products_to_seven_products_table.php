<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

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
                'name' => 'セブンカフェ ホットコーヒー R',
                'price' => 120,
                'category' => 'セブンカフェ',
                'image_path' => 'gazou2.png',
                'description' => 'セブンカフェ商品。仮データ。',
            ],
            [
                'name' => 'セブンカフェ アイスコーヒー R',
                'price' => 120,
                'category' => 'セブンカフェ',
                'image_path' => 'gazou2.png',
                'description' => 'セブンカフェ商品。仮データ。',
            ],
            [
                'name' => 'セブンカフェ カフェラテ R',
                'price' => 190,
                'category' => 'セブンカフェ',
                'image_path' => 'gazou2.png',
                'description' => 'セブンカフェ商品。仮データ。',
            ],
        ];

        foreach ($products as $product) {
            if (DB::table('seven_products')->where('name', $product['name'])->exists()) {
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
            ->where('category', 'セブンカフェ')
            ->whereIn('name', [
                'セブンカフェ ホットコーヒー R',
                'セブンカフェ アイスコーヒー R',
                'セブンカフェ カフェラテ R',
            ])
            ->delete();
    }
};
