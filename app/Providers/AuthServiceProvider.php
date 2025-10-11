<?php

namespace App\Providers;

use App\Models\TaskItem;
use App\Models\TaskNote;
use App\Models\Review;
use App\Models\Article;
use App\Policies\ReviewPolicy;
use App\Policies\TaskItemPolicy;
use App\Policies\TaskNotePolicy;
use App\Policies\ArticlePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        TaskNote::class => TaskNotePolicy::class,
        TaskItem::class=>TaskItemPolicy::class,
        Review::class=>ReviewPolicy::class,
        Article::class =>ArticlePolicy::class,
    ];

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
