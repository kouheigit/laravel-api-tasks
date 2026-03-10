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
            ['山賊焼', 278, '揚げ物惣菜', '山梨・長野名物の鶏肉の唐揚げ。ジューシーな味付け。284kcal'],
            ['８８コロッケ', 82, '揚げ物惣菜', '大阪限定販売のコロッケ。サクサク食感。174kcal'],
            ['でかい揚げ鶏', 232, 'ホットスナック', 'ホットスナック 大型サイズの揚げ鶏。全国販売。262kcal'],
            ['ほくじゃが牛肉コロッケ（塩胡椒）', 128, '揚げ物惣菜', '塩胡椒味の牛肉コロッケ。大阪販売。252kcal'],
            ['北海道産じゃがいもの牛肉コロッケ', 100, '揚げ物惣菜', '北海道産じゃがいも使用のコロッケ。224kcal'],
            ['【盛盛】若鶏のからあげ（むね）２０個', 1120, '揚げ物惣菜', '若鶏むね肉のからあげ20個入り大容量パック。1243kcal'],
            ['ＢＩＧポークフランク', 198, 'ホットスナック', 'ホットスナック 大きめサイズのポークフランク。288kcal'],
            ['ジューシー粗挽きソーセージ', 150, 'ホットスナック', 'ホットスナック 粗挽き肉のジューシーソーセージ。191kcal'],
            ['炭火焼き鳥（塩）', 176, '焼き鳥', '炭火で焼いた塩味の焼き鳥。66kcal'],
            ['炭火焼き鳥（タレ）', 176, '焼き鳥', '炭火で焼いたタレ味の焼き鳥。73kcal'],
            ['スパイスチキン', 232, 'ホットスナック', 'ホットスナック スパイスを効かせたチキン。200kcal'],
            ['スパイスチキンレッド', 232, 'ホットスナック', 'ホットスナック 辛味スパイスを効かせたチキン。'],
        ];

        $at = now()->setDateTime(2026, 3, 8, 10, 0, 0);

        foreach ($rows as [$name, $price, $category, $description]) {
            SevenProduct::create([
                'name' => $name,
                'price' => $price,
                'category' => $category,
                'image_path' => null,
                'description' => $description,
                'created_at' => $at,
                'updated_at' => $at,
            ]);
        }
    }
}
