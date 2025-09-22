<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskItemV2Resource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'status' => $this->status,
            'is_overdue' => $this->isOverdue(),
            'due_date' => $this->due_date->toDateString(),
            'priority' => $this->priority,
            'category' => $this->category?->name,
            'user' => $this->user?->name,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}


