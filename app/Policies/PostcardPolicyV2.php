<?php

namespace App\Policies;

use App\Models\Postcard;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PostcardPolicyV2
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Postcard $postcard): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Postcard $postcard): bool
    {
        return false;
    }
}
