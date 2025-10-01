<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskGroup extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function taskNotes()
    {
        return $this->hasMany(TaskNote::class,'task_group_id');
    }
}


