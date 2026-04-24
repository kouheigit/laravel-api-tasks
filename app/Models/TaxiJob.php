<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxiJob extends Model
{
    /** @use HasFactory<\Database\Factories\TaxiJobFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'company_name',
        'title',
        'employment_type',
        'prefecture',
        'city',
        'station',
        'vehicle_type',
        'shift_type',
        'experience_level',
        'salary_min',
        'salary_max',
        'salary_label',
        'day_shift_ratio',
        'night_shift_ratio',
        'match_score',
        'open_positions',
        'average_monthly_holidays',
        'tags',
        'benefits',
        'requirements',
        'catch_copy',
        'description',
        'training_program',
        'application_flow',
        'application_url',
        'contact_phone',
        'is_featured',
        'is_active',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'benefits' => 'array',
            'requirements' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'published_at' => 'date',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function scopePublished($query)
    {
        return $query
            ->where('is_active', true)
            ->whereDate('published_at', '<=', now()->toDateString());
    }
}
