<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\TaskItem;

class Category extends Model
{
    public function taskItems()
    {
        return $this->hasMany(TaskItem::class, 'task_category_id'); // 外部キーを合わせる
    }
    /*
    public function task()
    {
        return $this->hasMany(Task::class);
    }*/
}

