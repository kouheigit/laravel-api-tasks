<?php
namespace App\Enums;
enum TaskStatus: string
{
    case Pending = 'pending';
    case InProgress = 'in_progress';
    case Done = 'done';

    public function label(): string
    {
        return match ($this) {
            self::Pending => '未対応',
            self::InProgress => '進行中',
            self::Done => '完了',
        };
    }
}
