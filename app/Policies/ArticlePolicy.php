<?php

namespace App\Policies;

use App\Models\Writer;
use App\Models\Article;
use Illuminate\Auth\Access\Response;

class ArticlePolicy
{

    public function update(Writer $writer, Article $article): bool
    {
        return $writer->id === $article->writer_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Writer $writer, Article $article): bool
    {
        return $writer->id === $article->writer_id;
    }


}
