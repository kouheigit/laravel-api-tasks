<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    private array $products = [
        ['name' => '北海道産じゃがいもの牛肉コロッケ', 'price' => 100, 'image_path' => 'hotsnack/150587-croquette.jpg', 'description' => 'ホットスナック。添付写真の商品。224kcal'],
        ['name' => '揚げ鶏', 'price' => 232, 'image_path' => 'hotsnack/150089-age-dori.jpg', 'description' => 'ホットスナック。添付写真の商品。175kcal'],
        ['name' => 'ななチキ', 'price' => 232, 'image_path' => 'hotsnack/150398-nana-chiki.jpg', 'description' => 'ホットスナック。添付写真の商品。174kcal'],
        ['name' => 'ＢＩＧポークフランク', 'price' => 198, 'image_path' => 'hotsnack/150473-big-pork-frank.jpg', 'description' => 'ホットスナック。添付写真の商品。358kcal'],
        ['name' => 'ＢＩＧポークフランク', 'price' => 198, 'image_path' => 'hotsnack/150472-big-pork-frank.jpg', 'description' => 'ホットスナック。添付写真の商品。293kcal'],
        ['name' => 'アメリカンドッグ', 'price' => 139, 'image_path' => 'hotsnack/150302-american-dog.jpg', 'description' => 'ホットスナック。添付写真の商品。337kcal'],
        ['name' => 'からあげ棒', 'price' => 184, 'image_path' => 'hotsnack/150176-karaagebo.jpg', 'description' => 'ホットスナック。添付写真の商品。190kcal'],
        ['name' => 'ご愛顧からあげ棒（５個刺し）', 'price' => 184, 'image_path' => 'hotsnack/150793-goaiko-karaagebo-5.jpg', 'description' => 'ホットスナック。添付写真の商品。245kcal'],
    ];

    public function up(): void
    {
        $oldIds = DB::table('seven_products')
            ->where(function ($query) {
                $query->where('category', 'like', '%ホットスナック%')
                    ->orWhere('category', 'like', '%揚げ物惣菜%')
                    ->orWhere('description', 'like', '%ホットスナック%');
            })
            ->pluck('id');

        if ($oldIds->isNotEmpty()) {
            DB::table('seven_register_items')->whereIn('product_id', $oldIds)->delete();
            DB::table('seven_products')->whereIn('id', $oldIds)->delete();
        }

        $now = now();
        foreach ($this->products as $product) {
            DB::table('seven_products')->insert($product + [
                'category' => 'ホットスナック',
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }

    public function down(): void
    {
        $imagePaths = array_column($this->products, 'image_path');
        $ids = DB::table('seven_products')
            ->where('category', 'ホットスナック')
            ->whereIn('image_path', $imagePaths)
            ->pluck('id');

        if ($ids->isNotEmpty()) {
            DB::table('seven_register_items')->whereIn('product_id', $ids)->delete();
            DB::table('seven_products')->whereIn('id', $ids)->delete();
        }
    }
};
