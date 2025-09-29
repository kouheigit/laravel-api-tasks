<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\TaskStatus;

class TaskItemV2 extends Model
{
    use SoftDeletes;

    // デフォルトのテーブル名推論だと "task_item_v2_s" になるため明示指定
    protected $table = 'task_item_v2s';

    protected $fillable = [
        'title',
        'content',
        'status',
        'due_date',
        'priority',
        'task_category_v2_id',
        'user_id',
    ];

    protected $casts = [
        'due_date' => 'date',
        'status' => TaskStatus::class,
    ];

    public function category()
    {
        return $this->belongsTo(TaskCategoryV2::class, 'task_category_v2_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isOverdue(): bool
    {
        return $this->due_date->isPast() && $this->status !== TaskStatus::Done;
    }
}


