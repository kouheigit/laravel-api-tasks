<?php

namespace Database\Seeders;

use App\Models\SevenProduct;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SevenProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $at = now()->setDateTime(2026, 5, 9, 10, 0, 0);

        $hotSnackRows = [
            ['name' => '北海道産じゃがいもの牛肉コロッケ', 'price' => 100, 'category' => 'ホットスナック', 'image_path' => 'hotsnack/150587-croquette.jpg', 'description' => 'ホットスナック。添付写真の商品。224kcal'],
            ['name' => '揚げ鶏', 'price' => 232, 'category' => 'ホットスナック', 'image_path' => 'hotsnack/150089-age-dori.jpg', 'description' => 'ホットスナック。添付写真の商品。175kcal'],
            ['name' => 'ななチキ', 'price' => 232, 'category' => 'ホットスナック', 'image_path' => 'hotsnack/150398-nana-chiki.jpg', 'description' => 'ホットスナック。添付写真の商品。174kcal'],
            ['name' => 'ＢＩＧポークフランク', 'price' => 198, 'category' => 'ホットスナック', 'image_path' => 'hotsnack/150473-big-pork-frank.jpg', 'description' => 'ホットスナック。添付写真の商品。358kcal'],
            ['name' => 'ＢＩＧポークフランク', 'price' => 198, 'category' => 'ホットスナック', 'image_path' => 'hotsnack/150472-big-pork-frank.jpg', 'description' => 'ホットスナック。添付写真の商品。293kcal'],
            ['name' => 'アメリカンドッグ', 'price' => 139, 'category' => 'ホットスナック', 'image_path' => 'hotsnack/150302-american-dog.jpg', 'description' => 'ホットスナック。添付写真の商品。337kcal'],
            ['name' => 'からあげ棒', 'price' => 184, 'category' => 'ホットスナック', 'image_path' => 'hotsnack/150176-karaagebo.jpg', 'description' => 'ホットスナック。添付写真の商品。190kcal'],
            ['name' => 'ご愛顧からあげ棒（５個刺し）', 'price' => 184, 'category' => 'ホットスナック', 'image_path' => 'hotsnack/150793-goaiko-karaagebo-5.jpg', 'description' => 'ホットスナック。添付写真の商品。245kcal'],
        ];

        $oldHotSnackIds = DB::table('seven_products')
            ->where(function ($query) {
                $query->where('category', 'like', '%ホットスナック%')
                    ->orWhere('category', 'like', '%揚げ物惣菜%')
                    ->orWhere('description', 'like', '%ホットスナック%');
            })
            ->pluck('id');

        if ($oldHotSnackIds->isNotEmpty()) {
            DB::table('seven_register_items')->whereIn('product_id', $oldHotSnackIds)->delete();
            DB::table('seven_products')->whereIn('id', $oldHotSnackIds)->delete();
        }

        foreach ($hotSnackRows as $row) {
            SevenProduct::create($row + [
                'created_at' => $at,
                'updated_at' => $at,
            ]);
        }

        $rows = [
            ['name' => '炭火焼き鳥（塩）', 'price' => 176, 'category' => '焼き鳥', 'image_path' => null, 'description' => '炭火で焼いた塩味の焼き鳥。66kcal'],
            ['name' => '炭火焼き鳥（タレ）', 'price' => 176, 'category' => '焼き鳥', 'image_path' => null, 'description' => '炭火で焼いたタレ味の焼き鳥。73kcal'],
        ];

        foreach ($rows as $row) {
            SevenProduct::updateOrCreate(
                ['name' => $row['name']],
                [
                    'price' => $row['price'],
                    'category' => $row['category'],
                    'image_path' => $row['image_path'],
                    'description' => $row['description'],
                    'updated_at' => $at,
                ] + (
                    SevenProduct::where('name', $row['name'])->exists()
                        ? []
                        : ['created_at' => $at]
                )
            );
        }

        SevenProduct::updateOrCreate(
            ['name' => 'つくねおむすび'],
            [
                'price' => 125,
                'category' => 'コンビニおにぎり・コンビニ手巻寿司',
                'image_path' => 'onigiri/tsukune-omusubi-20yen-discount.png',
                'description' => '食感の良い軟骨入りつくねをのせたボリュームのあるおむすび。内容量・参考価格 1個・125円。発売日 2021/11/30。',
                'updated_at' => $at,
            ] + (
                SevenProduct::where('name', 'つくねおむすび')->exists()
                    ? []
                    : ['created_at' => $at]
            )
        );

        $nikumanRows = [
            ['name' => 'ふんわり×ごろっと 肉まん', 'price' => 156, 'category' => '中華まん', 'image_path' => 'nikuman/150092-nikuman.jpg', 'description' => '中華まん。全国販売。212kcal。セブン-イレブン公式の中華まん掲載商品。'],
            ['name' => 'もちふわ×とろ～り ピザまん', 'price' => 158, 'category' => '中華まん', 'image_path' => 'nikuman/150129-pizza-man.jpg', 'description' => '中華まん。全国販売。194kcal。セブン-イレブン公式の中華まん掲載商品。'],
            ['name' => 'もちもち×ずっしり 大入り豚まん', 'price' => 232, 'category' => '中華まん', 'image_path' => 'nikuman/150312-ooiri-butaman.jpg', 'description' => '中華まん。北海道、東北、関東、甲信越、北陸、東海、中国、四国、九州、沖縄で販売。340kcal。セブン-イレブン公式の中華まん掲載商品。'],
            ['name' => 'もっちり×ジューシー 特製豚まん', 'price' => 195, 'category' => '中華まん', 'image_path' => 'nikuman/150581-tokusei-butaman.jpg', 'description' => '中華まん。近畿限定販売。358kcal。セブン-イレブン公式の中華まん掲載商品。'],
        ];

        $oldNikumanIds = DB::table('seven_products')
            ->where(function ($query) {
                $query->where('category', '中華まん')
                    ->orWhere('description', 'like', '%肉まん%')
                    ->orWhere('description', 'like', '%中華まん%');
            })
            ->pluck('id');

        if ($oldNikumanIds->isNotEmpty()) {
            DB::table('seven_register_items')->whereIn('product_id', $oldNikumanIds)->delete();
            DB::table('seven_products')->whereIn('id', $oldNikumanIds)->delete();
        }

        foreach ($nikumanRows as $row) {
            SevenProduct::create($row + [
                'created_at' => $at,
                'updated_at' => $at,
            ]);
        }
    }
}
