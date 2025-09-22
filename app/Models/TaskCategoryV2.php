<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskCategoryV2 extends Model
{
    protected $fillable = [
        'name',
    ];

    public function taskItems()
    {
        return $this->hasMany(TaskItemV2::class, 'task_category_v2_id');
    }
}


