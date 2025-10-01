<?php

namespace App\Models;

use App\Enums\NoteStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskNote extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'title','content','status','due_date','priority',
        'task_group_id','user_id'
    ];
    protected $casts = [
        'due_date'=>'date',
        'status'=>NoteStatus::class,
    ];
    public function group(){
        return $this->belongsTo(TaskGroup::class,'task_group_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getIsOverdueAttribute(): bool
    {
        return $this->due_date < now();
    }
}

