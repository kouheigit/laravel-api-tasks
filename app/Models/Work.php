<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
