<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class Review extends Model
{
    public function products(){
        return $this->belongsTo(Product::class);
    }
}
