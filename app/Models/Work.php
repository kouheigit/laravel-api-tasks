<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\WorkStatus;
use Carbon\Carbon;

class Work extends Model
{
    protected $fillable = [
        'title',
        'content',
        'status',
        'due_date',
        'genre_id',
        'user_id',
    ];

    protected  $casts = [
        'status'=>WorkStatus::class,
    ];

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function isOverdue(): bool
    {
        return Carbon::parse($this->due_date)->isPast();
    }

    public function scopeOverdue($query)
    {
        return $query->whereDate('due_date', '<', now());
    }
}
