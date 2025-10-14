<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ScribeAccount extends Model
{
    use HasApiTokens;
    use HasFactory;

    protected $fillable = ['name','email','password'];

    public function postcards()
    {
        return $this->hasMany(Postcard::class);
    }
}
