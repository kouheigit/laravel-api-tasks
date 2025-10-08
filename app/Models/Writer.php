<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Writer extends Model
{
    use HasFactory,HasApiTokens;

    protected $fillable = ['name','email','password'];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
