<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;
    protected $fillable = ['title','body','writer_id'];
    public function writer()
    {
        return $this->belongsTo(Writer::class);
    }
}
