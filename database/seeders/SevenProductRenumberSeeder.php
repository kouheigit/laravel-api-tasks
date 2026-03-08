<?php

namespace Database\Seeders;

use App\Models\SevenProduct;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SevenProductRenumberSeeder extends Seeder
{
    /**
     * seven_products の ID を 1 から連番に振り直す（欠番をなくす）
     */
    public function run(): void
    {
        $rows = SevenProduct::orderBy('id')->get();
        if ($rows->isEmpty()) {
            return;
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        SevenProduct::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        $newId = 1;
        foreach ($rows as $r) {
            DB::table('seven_products')->insert([
                'id' => $newId++,
                'name' => $r->name,
                'price' => $r->price,
                'category' => $r->category,
                'image_path' => $r->image_path,
                'description' => $r->description,
                'created_at' => $r->created_at,
                'updated_at' => $r->updated_at,
            ]);
        }
    }
}
