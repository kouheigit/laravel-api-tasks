<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TodoPriorities extends Model
{
    protected $table = 'todo_priorities';

    protected $fillable =[
        'name',
        'label',
        'sort_order',
    ];
    public function tasks(): HasMany
    {
        return $this->hasMany(TodoTask::class, 'todo_priority_id');
    }
    
}
