<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SevenRegister extends Model
{
    use HasFactory;

    protected $table = 'seven_registers';

    protected $fillable = [
        'customer_type',
        'total_amount',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(SevenRegisterItem::class, 'register_id');
    }
}
