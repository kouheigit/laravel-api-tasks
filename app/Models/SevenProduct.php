<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SevenProduct extends Model
{
    use HasFactory;

    protected $table = 'seven_products';

    protected $fillable = [
        'name',
        'price',
        'category',
        'image_path',
        'description',
    ];
}

