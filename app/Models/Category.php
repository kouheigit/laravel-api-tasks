<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    public function task()
    {
        return $this->hasMany(Task::class);
    }
}

