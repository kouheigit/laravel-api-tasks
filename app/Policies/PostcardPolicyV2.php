<?php

namespace App\Policies;

use App\Models\Postcard;
use App\Models\ScribeAccount;


class PostcardPolicyV2
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(ScribeAccount $user, Postcard $postcard): bool
    {
        return $user->id === $postcard->scribe_account_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(ScribeAccount $user, Postcard $postcard): bool
    {
        return $user->id === $postcard->scribe_account_id;
    }
}
