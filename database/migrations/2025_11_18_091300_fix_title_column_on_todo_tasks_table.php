<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('todo_tasks', 'titile')) {
            return;
        }

        Schema::table('todo_tasks', function (Blueprint $table) {
            if (! Schema::hasColumn('todo_tasks', 'title')) {
                $table->string('title')->nullable()->after('todo_user_id');
            }
        });

        DB::statement('UPDATE todo_tasks SET title = titile WHERE title IS NULL');

        Schema::table('todo_tasks', function (Blueprint $table) {
            $table->dropColumn('titile');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('todo_tasks', 'title')) {
            return;
        }

        Schema::table('todo_tasks', function (Blueprint $table) {
            $table->string('titile')->nullable()->after('todo_user_id');
        });

        DB::statement('UPDATE todo_tasks SET titile = title WHERE titile IS NULL');

        Schema::table('todo_tasks', function (Blueprint $table) {
            $table->dropColumn('title');
        });
    }
};

