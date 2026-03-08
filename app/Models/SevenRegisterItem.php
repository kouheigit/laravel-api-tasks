<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SevenRegisterItem extends Model
{
    use HasFactory;

    protected $table = 'seven_register_items';

    protected $fillable = [
        'register_id',
        'product_id',
        'product_name',
        'price',
        'quantity',
        'subtotal',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function register(): BelongsTo
    {
        return $this->belongsTo(SevenRegister::class, 'register_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(SevenProduct::class, 'product_id');
    }
}
