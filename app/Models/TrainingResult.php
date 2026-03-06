<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrainingResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'result_id',
        'scenario_id',
        'started_at',
        'ended_at',
        'error_count',
        'score',
        'error_details',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'error_details' => 'array',
    ];

    public function scenario(): BelongsTo
    {
        return $this->belongsTo(TrainingScenario::class, 'scenario_id', 'scenario_id');
    }
}

