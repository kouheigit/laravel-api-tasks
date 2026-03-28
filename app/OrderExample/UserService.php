<?php


class UserService
{
    public function createUser(array $data){
        //ネスト防止
        $user = 0;
        if (!$user) return;
        if (!$user->isActive()) return;
        if (!$user->hasSubscription()) return;
        if (!$user->subscription->isValid()) return;
    }
    public function updateUser(int $id, array $data){

    }
    public function deleteUser(int $id)
    {

    }
}

/*
 *
class Class001
{
    public function method001(){

    }
    public function method002(){

    }
}*/

/*
 * class UserService
{
    public function createUser(array $data) {}
    public function updateUser(int $id, array $data) {}
    public function deleteUser(int $id) {}
}
 */

