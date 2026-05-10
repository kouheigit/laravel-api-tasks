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
        DB::table('seven_products')
            ->where('name', 'つくねおむすび')
            ->where('image_path', 'onigiri/tsukune-omusubi-20yen-discount.png')
            ->update([
                'image_path' => 'onigiri/tsukune-omusubi-original.png',
                'updated_at' => now(),
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('seven_products')
            ->where('name', 'つくねおむすび')
            ->where('image_path', 'onigiri/tsukune-omusubi-original.png')
            ->update([
                'image_path' => 'onigiri/tsukune-omusubi-20yen-discount.png',
                'updated_at' => now(),
            ]);
    }
};
