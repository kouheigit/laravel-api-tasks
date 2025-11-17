<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TodoStatus extends Model
{
    protected $table = 'todo_statuses';

    protected $fillable = [
      'name',
      'label',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(TodoTask::class,'todo_status_id');
    }
}
