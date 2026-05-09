<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private array $products = [
        [
            'name' => 'ふんわり×ごろっと 肉まん',
            'price' => 156,
            'image_path' => 'nikuman/150092-nikuman.jpg',
            'description' => '中華まん。全国販売。212kcal。セブン-イレブン公式の中華まん掲載商品。',
        ],
        [
            'name' => 'もちふわ×とろ～り ピザまん',
            'price' => 158,
            'image_path' => 'nikuman/150129-pizza-man.jpg',
            'description' => '中華まん。全国販売。194kcal。セブン-イレブン公式の中華まん掲載商品。',
        ],
        [
            'name' => 'もちもち×ずっしり 大入り豚まん',
            'price' => 232,
            'image_path' => 'nikuman/150312-ooiri-butaman.jpg',
            'description' => '中華まん。北海道、東北、関東、甲信越、北陸、東海、中国、四国、九州、沖縄で販売。340kcal。セブン-イレブン公式の中華まん掲載商品。',
        ],
        [
            'name' => 'もっちり×ジューシー 特製豚まん',
            'price' => 195,
            'image_path' => 'nikuman/150581-tokusei-butaman.jpg',
            'description' => '中華まん。近畿限定販売。358kcal。セブン-イレブン公式の中華まん掲載商品。',
        ],
    ];

    public function up(): void
    {
        $oldIds = DB::table('seven_products')
            ->where(function ($query) {
                $query->where('category', '中華まん')
                    ->orWhere('description', 'like', '%肉まん%')
                    ->orWhere('description', 'like', '%中華まん%');
            })
            ->pluck('id');

        if ($oldIds->isNotEmpty()) {
            DB::table('seven_register_items')->whereIn('product_id', $oldIds)->delete();
            DB::table('seven_products')->whereIn('id', $oldIds)->delete();
        }

        $now = now();
        foreach ($this->products as $product) {
            DB::table('seven_products')->insert($product + [
                'category' => '中華まん',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    public function down(): void
    {
        $imagePaths = array_column($this->products, 'image_path');
        $ids = DB::table('seven_products')
            ->where('category', '中華まん')
            ->whereIn('image_path', $imagePaths)
            ->pluck('id');

        if ($ids->isNotEmpty()) {
            DB::table('seven_register_items')->whereIn('product_id', $ids)->delete();
            DB::table('seven_products')->whereIn('id', $ids)->delete();
        }
    }
};
