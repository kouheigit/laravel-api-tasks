<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * category が ホットスナック の商品の description に「ホットスナック」を追加。
     * description を参照して商品を出力するため。
     */
    public function up(): void
    {
        $products = DB::table('seven_products')
            ->where('category', 'like', '%ホットスナック%')
            ->get();

        foreach ($products as $p) {
            if (strpos($p->description ?? '', 'ホットスナック') !== false) {
                continue;
            }
            $desc = $p->description ? 'ホットスナック ' . $p->description : 'ホットスナック';
            DB::table('seven_products')->where('id', $p->id)->update(['description' => $desc]);
        }
    }

    public function down(): void
    {
        $products = DB::table('seven_products')
            ->where('description', 'like', 'ホットスナック %')
            ->get();

        foreach ($products as $p) {
            $desc = preg_replace('/^ホットスナック\s*/', '', $p->description);
            DB::table('seven_products')->where('id', $p->id)->update(['description' => $desc ?: null]);
        }
    }
};
