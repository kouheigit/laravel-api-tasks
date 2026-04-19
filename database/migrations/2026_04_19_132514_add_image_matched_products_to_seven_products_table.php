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
                'name' => 'マルちゃん正麺 芳醇醤油',
                'price' => 181,
                'category' => 'カップ麺',
                'image_path' => 'gazou1.png',
                'description' => '商品画像に合わせて追加したカップ麺。',
            ],
            [
                'name' => 'UCC BLACK 無糖',
                'price' => 145,
                'category' => '缶コーヒー',
                'image_path' => 'gazou2.png',
                'description' => '商品画像に合わせて追加した無糖ブラックコーヒー。',
            ],
            [
                'name' => 'セブン弁当（梅ごはん）',
                'price' => 498,
                'category' => '弁当',
                'image_path' => 'gazou3.png',
                'description' => '商品画像に合わせて追加した弁当。価格は画像内容からの推定。',
            ],
            [
                'name' => 'カルビー ポテトチップス うすしお味 60g',
                'price' => 168,
                'category' => 'スナック',
                'image_path' => 'gazou4.png',
                'description' => '商品画像に合わせて追加したスナック菓子。',
            ],
            [
                'name' => 'キリン 一番搾り 350ml',
                'price' => 235,
                'category' => 'ビール',
                'image_path' => 'gazou5.png',
                'description' => '商品画像に合わせて追加したビール。',
            ],
        ];

        foreach ($products as $product) {
            $exists = DB::table('seven_products')
                ->where('name', $product['name'])
                ->where('image_path', $product['image_path'])
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
            ->whereIn('image_path', [
                'gazou1.png',
                'gazou2.png',
                'gazou3.png',
                'gazou4.png',
                'gazou5.png',
            ])
            ->whereIn('name', [
                'マルちゃん正麺 芳醇醤油',
                'UCC BLACK 無糖',
                'セブン弁当（梅ごはん）',
                'カルビー ポテトチップス うすしお味 60g',
                'キリン 一番搾り 350ml',
            ])
            ->delete();
    }
};
