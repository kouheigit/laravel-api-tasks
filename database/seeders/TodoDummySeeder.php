<?php

namespace Database\Seeders;

use App\Models\TodoPriorities;
use App\Models\TodoStatus;
use App\Models\TodoTasks;
use App\Models\TodoUser;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TodoDummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. TodoUser（ダミーユーザー）を確保
        $demoUser = TodoUser::firstOrCreate(
            ['email' => 'demo-todo@example.com'],
            [
                'name' => 'Demo Todo User',
                'password' => Hash::make('password'),
            ]
        );

        // 2. ステータスの初期データ（未着手 / 進行中 / 完了）
        $statusMap = collect([
            ['name' => 'not_started', 'label' => '未着手'],
            ['name' => 'in_progress', 'label' => '進行中'],
            ['name' => 'completed', 'label' => '完了'],
        ])->mapWithKeys(function ($status) {
            $record = TodoStatus::firstOrCreate(
                ['name' => $status['name']],
                ['label' => $status['label']]
            );

            return [$status['name'] => $record->id];
        });

        // 3. 優先度の初期データ（低 / 中 / 高）
        $priorityMap = collect([
            ['name' => 'low', 'label' => '低', 'sort_order' => 1],
            ['name' => 'medium', 'label' => '中', 'sort_order' => 2],
            ['name' => 'high', 'label' => '高', 'sort_order' => 3],
        ])->mapWithKeys(function ($priority) {
            $record = TodoPriorities::firstOrCreate(
                ['name' => $priority['name']],
                [
                    'label' => $priority['label'],
                    'sort_order' => $priority['sort_order'],
                ]
            );

            return [$priority['name'] => $record->id];
        });

        // 4. 既存のデモユーザーのタスクを整理（必要なら削除）
        TodoTasks::where('todo_user_id', $demoUser->id)->delete();

        // 5. ダミータスクを10件作成
        for ($i = 1; $i <= 10; $i++) {
            $statusId = $statusMap->random();
            $priorityId = $priorityMap->random();

            TodoTasks::create([
                'todo_user_id' => $demoUser->id,
                'title' => "ダミータスク {$i}",
                'description' => "これはダミーのTodoタスク {$i} です。",
                'due_date' => Carbon::now()->addDays($i)->setTime(18, 0),
                'todo_status_id' => $statusId,
                'todo_priority_id' => $priorityId,
            ]);
        }
    }
}

