<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResourceV2 extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
          'id'=>$this->id,
          'title'=>$this->title,
          'body'=>$this->body,
          'writer'=>[
              'id'=>$this->writer->id,
              'name'=>$this->writer->name,
          ],
            'created'=>$this->created_at?->format('Y-m-d H:i'),
        ];
    }
}

