<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'spent_on',
        'amount',
        'title',
        'memo',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
