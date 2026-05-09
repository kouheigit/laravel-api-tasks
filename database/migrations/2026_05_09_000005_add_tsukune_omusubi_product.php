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
        DB::table('seven_products')->updateOrInsert(
            ['name' => 'つくねおむすび'],
            [
                'price' => 125,
                'category' => 'コンビニおにぎり・コンビニ手巻寿司',
                'image_path' => 'onigiri/tsukune-omusubi-20yen-discount.png',
                'description' => '食感の良い軟骨入りつくねをのせたボリュームのあるおむすび。内容量・参考価格 1個・125円。発売日 2021/11/30。',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('seven_products')
            ->where('name', 'つくねおむすび')
            ->where('image_path', 'onigiri/tsukune-omusubi-20yen-discount.png')
            ->delete();
    }
};
