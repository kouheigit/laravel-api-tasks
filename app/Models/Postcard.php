<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Postcard extends Model
{
    use HasFactory;
    protected $fillable = ['headline','message','scribe_account_id'];

    public function scribeAccount()
    {
        return $this->belongsTo(ScribeAccount::class);
    }

}
