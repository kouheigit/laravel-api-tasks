<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seven_register_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('register_id')->constrained('seven_registers')->cascadeOnDelete();
            $table->unsignedBigInteger('product_id');
            $table->string('product_name');
            $table->integer('price');
            $table->integer('quantity');
            $table->integer('subtotal');
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('seven_products')->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seven_register_items');
    }
};
