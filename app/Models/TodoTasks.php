<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TodoTasks extends Model
{
    protected $table = 'todo_tasks';

    protected $fillable = [
        'todo_user_id',
        'title',
        'description',
        'due_date',
        'todo_status_id',
        'todo_priority_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(TodoUser::class, 'todo_user_id');
    }


    public function status(): BelongsTo
    {
        return $this->belongsTo(TodoStatus::class, 'todo_status_id');
    }


    public function priority(): BelongsTo
    {
        return $this->belongsTo(TodoPriority::class, 'todo_priority_id');
    }
    
}
