<?php

namespace App\Policies;

use App\Models\TaskItem;
use App\Models\User;

class TaskItemPolicy
{

    public function view(User $user, TaskItem $taskItem): bool
    {
        return $user->id === $taskItem->user_id;
    }

    public function update(User $user, TaskItem $taskItem): bool
    {
        return $user->id === $taskItem->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TaskItem $taskItem): bool
    {
        return $user->id === $taskItem->user_id;
       // return false;
    }

}
