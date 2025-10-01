<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskNoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' =>$this->id,
            'title'=>$this->title,
            'content'=>$this->content,
            'status'=>$this->status,
            'is_overdue'=>$this->is_overdue,
            'due_date' => $this->due_date->toDateString(),

          /*
           *    'id' => $this->id,
        'title' => $this->title,
        'content' => $this->content,
        'status' => $this->status,                       // NoteStatus の文字列表現
        'is_overdue' => $this->is_overdue,               // アクセサ
        'due_date' => $this->due_date->toDateString(),
        'priority' => $this->priority,
        'group' => $this->group?->name,
        'user' => $this->user->name,
        'created_at' => $this->created_at->format('Y-m-d H:i:s'),
           */
        ];
        /*
        return parent::toArray($request);
        */
    }
}
