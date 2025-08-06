<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class Review extends Model
{
    protected $fillable = [
        'title',
        'content',
        'status',
        'due_date',
        'priority',
        'product_id'
    ];
    public function products(){
        return $this->belongsTo(Product::class);
    }
}
