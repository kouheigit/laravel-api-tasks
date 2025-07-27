<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\TaskStatus;
use Carbon\Carbon;

class TaskItem extends Model
{
    /*
    use SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'status',
        'due_date',
        'priority',
        'task_category_id',
        'user_id',
    ];

    protected $casts = [
        'due_date' => 'date',
        'status' => TaskStatus::class,
    ];

    // 🔁 リレーション
    public function category()
    {
        return $this->belongsTo(TaskCategory::class, 'task_category_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 📌 課題6：期限超過判定
    public function isOverdue(): bool
    {
        return $this->due_date->isPast() && $this->status !== TaskStatus::Done;
    }*/
}
