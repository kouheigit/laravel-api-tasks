<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainingScenario extends Model
{
    use HasFactory;

    protected $fillable = [
        'scenario_id',
        'mode_type',
        'scenario_name',
        'payment_type',
        'target_items',
        'bill_count',
        'bill_type',
        'allow_only_cash',
        'guide_level',
    ];

    protected $casts = [
        'target_items' => 'array',
        'allow_only_cash' => 'boolean',
    ];

    public function results(): HasMany
    {
        return $this->hasMany(TrainingResult::class, 'scenario_id', 'scenario_id');
    }
}

