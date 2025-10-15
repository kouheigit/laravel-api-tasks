<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class ScribeAccount extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = ['name','email','password'];

    protected $hidden = [
        'password',
    ];

    public function postcards()
    {
        return $this->hasMany(Postcard::class);
    }
}
