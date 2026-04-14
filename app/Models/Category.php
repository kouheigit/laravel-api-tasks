<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TaskItem;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function taskItems()
    {
        return $this->hasMany(TaskItem::class, 'task_category_id'); // 外部キーを合わせる
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    /*
    public function task()
    {
        return $this->hasMany(Task::class);
    }*/
}
