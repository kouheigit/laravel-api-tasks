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
        Schema::create('training_scenarios', function (Blueprint $table) {
            $table->id();
            $table->string('scenario_id')->unique();
            $table->string('mode_type'); // normal / public_payment
            $table->string('scenario_name');
            $table->string('payment_type'); // cash / credit / barcode / emoney / public_cash
            $table->json('target_items')->nullable();
            $table->unsignedTinyInteger('bill_count')->nullable();
            $table->string('bill_type')->nullable(); // normal / car_tax
            $table->boolean('allow_only_cash')->default(false);
            $table->string('guide_level')->default('beginner'); // beginner / normal / exam
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_scenarios');
    }
};

