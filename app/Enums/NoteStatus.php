<?php
namespace App\Enums;
enum NoteStatus: string
{
    case Todo = 'Todo';
    case InProgress ='InProgress';
    case Done = 'Done';
}

