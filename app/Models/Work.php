<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\WorkStatus;

class Work extends Model
{

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
}
