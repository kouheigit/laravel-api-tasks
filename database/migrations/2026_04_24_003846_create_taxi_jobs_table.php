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
        Schema::create('taxi_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('company_name');
            $table->string('title');
            $table->string('employment_type');
            $table->string('prefecture');
            $table->string('city');
            $table->string('station')->nullable();
            $table->string('vehicle_type');
            $table->string('shift_type');
            $table->string('experience_level');
            $table->unsignedInteger('salary_min');
            $table->unsignedInteger('salary_max');
            $table->string('salary_label');
            $table->unsignedTinyInteger('day_shift_ratio')->default(50);
            $table->unsignedTinyInteger('night_shift_ratio')->default(50);
            $table->unsignedTinyInteger('match_score')->default(80);
            $table->unsignedTinyInteger('open_positions')->default(1);
            $table->unsignedSmallInteger('average_monthly_holidays')->default(8);
            $table->json('tags')->nullable();
            $table->json('benefits')->nullable();
            $table->json('requirements')->nullable();
            $table->text('catch_copy');
            $table->text('description');
            $table->text('training_program');
            $table->text('application_flow');
            $table->string('application_url')->nullable();
            $table->string('contact_phone')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->date('published_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taxi_jobs');
    }
};
