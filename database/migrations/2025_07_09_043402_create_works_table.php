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
        Schema::create('works', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->text('content');
            $table->string('status');
            $table->foreignId('genre_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();$table->date('due_date');
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('works', function (Blueprint $table) {
            $table->dropForeign(['genre_id']);
            $table->foreignId('genre_id')
                ->nullable()
                ->constrained()
                ->onDelete('cascade'); // 元に戻す場合など
        });
        /*
        Schema::dropIfExists('works');*/

    }
};
