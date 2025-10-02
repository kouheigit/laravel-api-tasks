<?php

namespace App\Policies;

use App\Models\TaskNote;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskNotePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TaskNote $note): bool
    {
        return $note->user_id === $user->id;
    }


    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TaskNote $note): bool
    {
        return $note->user_id === $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TaskNote $note): bool
    {
        return $note->user_id === $user->id;
    }
    public function create(User $user): bool
    {
        return true;
    }

}
