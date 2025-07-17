<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'status' => $this->status,
            'is_overdue' => $this->isOverdue(),
            'due_date' => $this->due_date,
            'genre' => $this->genre?->name,    // genreリレーションがあれば
            'user' => $this->user?->name,      // userリレーションがあれば
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
