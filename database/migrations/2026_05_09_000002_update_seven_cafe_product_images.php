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
            ['name' => '７カフェ　水素焙煎コーヒーアイスＲ', 'price' => 156, 'image_path' => 'sevencafe/140233.jpg', 'code' => '140233'],
            ['name' => 'セブンカフェ　ホットコーヒーＲ', 'price' => 130, 'image_path' => 'sevencafe/140469.jpg', 'code' => '140469'],
            ['name' => 'セブンカフェホットコーヒーＬ', 'price' => 204, 'image_path' => 'sevencafe/140470.jpg', 'code' => '140470'],
            ['name' => 'セブンカフェ　アイスコーヒーＲ', 'price' => 130, 'image_path' => 'sevencafe/140471.jpg', 'code' => '140471'],
            ['name' => 'セブンカフェアイスコーヒーＬ', 'price' => 232, 'image_path' => 'sevencafe/140472.jpg', 'code' => '140472'],
            ['name' => 'セブンカフェ　水素焙煎コーヒーホットＲ', 'price' => 149, 'image_path' => 'sevencafe/140016.jpg', 'code' => '140016'],
            ['name' => '７カフェ　ホットカフェラテＲ', 'price' => 204, 'image_path' => 'sevencafe/140481.jpg', 'code' => '140481'],
            ['name' => '７カフェ　ホットカフェラテＬ', 'price' => 260, 'image_path' => 'sevencafe/140482.jpg', 'code' => '140482'],
            ['name' => '７カフェ　アイスカフェラテＲ', 'price' => 250, 'image_path' => 'sevencafe/140483.jpg', 'code' => '140483'],
            ['name' => '７カフェ　アイスカフェラテＬ', 'price' => 315, 'image_path' => 'sevencafe/140484.jpg', 'code' => '140484'],
        ];

        foreach ($products as $product) {
            $values = [
                'price' => $product['price'],
                'category' => 'セブンカフェ',
                'image_path' => $product['image_path'],
                'description' => 'セブンカフェ商品。公式商品一覧から取得した商品コード: ' . $product['code'],
                'updated_at' => $now,
            ];

            if (DB::table('seven_products')->where('name', $product['name'])->exists()) {
                DB::table('seven_products')->where('name', $product['name'])->update($values);
            } else {
                DB::table('seven_products')->insert($values + [
                    'name' => $product['name'],
                    'created_at' => $now,
                ]);
            }
        }

        DB::table('seven_products')
            ->where('category', 'セブンカフェ')
            ->whereIn('name', [
                'セブンカフェ ホットコーヒー R',
                'セブンカフェ アイスコーヒー R',
                'セブンカフェ カフェラテ R',
            ])
            ->delete();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('seven_products')
            ->where('category', 'セブンカフェ')
            ->whereIn('image_path', [
                'sevencafe/140233.jpg',
                'sevencafe/140469.jpg',
                'sevencafe/140470.jpg',
                'sevencafe/140471.jpg',
                'sevencafe/140472.jpg',
                'sevencafe/140016.jpg',
                'sevencafe/140481.jpg',
                'sevencafe/140482.jpg',
                'sevencafe/140483.jpg',
                'sevencafe/140484.jpg',
            ])
            ->delete();
    }
};
