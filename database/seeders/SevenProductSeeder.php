<?php

namespace Database\Seeders;

use App\Models\SevenProduct;
use Illuminate\Database\Seeder;

class SevenProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            ['name' => '山賊焼', 'price' => 278, 'category' => '揚げ物惣菜', 'image_path' => null, 'description' => '山梨・長野名物の鶏肉の唐揚げ。ジューシーな味付け。284kcal'],
            ['name' => '８８コロッケ', 'price' => 82, 'category' => '揚げ物惣菜', 'image_path' => null, 'description' => '大阪限定販売のコロッケ。サクサク食感。174kcal'],
            ['name' => 'でかい揚げ鶏', 'price' => 232, 'category' => 'ホットスナック', 'image_path' => null, 'description' => 'ホットスナック 大型サイズの揚げ鶏。全国販売。262kcal'],
            ['name' => 'ほくじゃが牛肉コロッケ（塩胡椒）', 'price' => 128, 'category' => '揚げ物惣菜', 'image_path' => null, 'description' => '塩胡椒味の牛肉コロッケ。大阪販売。252kcal'],
            ['name' => '北海道産じゃがいもの牛肉コロッケ', 'price' => 100, 'category' => '揚げ物惣菜', 'image_path' => null, 'description' => '北海道産じゃがいも使用のコロッケ。224kcal'],
            ['name' => '【盛盛】若鶏のからあげ（むね）２０個', 'price' => 1120, 'category' => '揚げ物惣菜', 'image_path' => null, 'description' => '若鶏むね肉のからあげ20個入り大容量パック。1243kcal'],
            ['name' => 'ＢＩＧポークフランク', 'price' => 198, 'category' => 'ホットスナック', 'image_path' => null, 'description' => 'ホットスナック 大きめサイズのポークフランク。288kcal'],
            ['name' => 'ジューシー粗挽きソーセージ', 'price' => 150, 'category' => 'ホットスナック', 'image_path' => null, 'description' => 'ホットスナック 粗挽き肉のジューシーソーセージ。191kcal'],
            ['name' => '炭火焼き鳥（塩）', 'price' => 176, 'category' => '焼き鳥', 'image_path' => null, 'description' => '炭火で焼いた塩味の焼き鳥。66kcal'],
            ['name' => '炭火焼き鳥（タレ）', 'price' => 176, 'category' => '焼き鳥', 'image_path' => null, 'description' => '炭火で焼いたタレ味の焼き鳥。73kcal'],
            ['name' => 'スパイスチキン', 'price' => 232, 'category' => 'ホットスナック', 'image_path' => null, 'description' => 'ホットスナック スパイスを効かせたチキン。200kcal'],
            ['name' => 'スパイスチキンレッド', 'price' => 232, 'category' => 'ホットスナック', 'image_path' => null, 'description' => 'ホットスナック 辛味スパイスを効かせたチキン。'],
            ['name' => 'ふんわり×ごろっと 肉まん', 'price' => 156, 'category' => '中華まん', 'image_path' => null, 'description' => '肉まん。全国販売。212kcal。セブン-イレブン公式の中華まん掲載商品。'],
            ['name' => 'もちもち×ずっしり 大入り豚まん', 'price' => 232, 'category' => '中華まん', 'image_path' => null, 'description' => '肉まん。北海道、東北、関東、甲信越、北陸、東海、中国、四国、九州、沖縄で販売。340kcal。セブン-イレブン公式の中華まん掲載商品。'],
            ['name' => 'もっちり×ジューシー 特製豚まん', 'price' => 195, 'category' => '中華まん', 'image_path' => null, 'description' => '肉まん。近畿限定販売。358kcal。セブン-イレブン公式の中華まん掲載商品。'],
        ];

        $at = now()->setDateTime(2026, 3, 8, 10, 0, 0);

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
    }
}
