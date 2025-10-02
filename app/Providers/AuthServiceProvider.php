<?php

namespace App\Providers;

use App\Models\TaskItem;
use App\Policies\ReviewPolicy;
use App\Policies\TaskItemPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        TaskNote::class => TaskNotePolicy::class,
        TaskItem::class=>TaskItemPolicy::class,
        Review::class=>ReviewPolicy::class,
    ];

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
