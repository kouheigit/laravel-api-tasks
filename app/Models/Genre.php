<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $fillable = ['name'];
    public function works()
    {
        return $this->hasMany(Work::class);
    }
    public function getTaskCountAttribute()
    {
        return $this->works->count();
    }
}
