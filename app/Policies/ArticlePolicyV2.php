<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;

class ArticlePolicyV2
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Article $article): bool
    {
        return $user->id === $article->writer_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Article $article): bool
    {
        return $user->id === $article->writer_id;
    }
}

