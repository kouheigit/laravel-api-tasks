<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TodoTasks extends Model
{
    protected $table = 'todo_tasks';

    protected $fillable = [
        'todo_user_id',
        'title',
        'description',
        'due_date',

    ];
   
}
