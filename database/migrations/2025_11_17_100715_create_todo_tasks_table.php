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
        Schema::create('todo_tasks', function (Blueprint $table) {
            $table->id();
            //ユーザー
            $table->foreignId('todo_user_id')->constrained('todo_users');
            // タスク内容
            $table->string('titile');
            $table->text('description')->nullable();
            $table->dateTime('due_date')->nullable();

            //ステータス


            $table->timestamps();

        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_tasks');
    }
};
