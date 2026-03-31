<?php

class AttackPower
{
    private const MIN = 0;

    public int $value;

    public function __construct(int $value)
    {
        if($value < self::MIN){
            throw new \http\Exception\InvalidArgumentException();
        }
        $this->value = $value;
    }

    public function enhance(int $increment): void
    {
        $this->value += $increment;//←直接変更
    }

    public function disable(): void
    {
        $this->value = self::MIN;//←直接変更
    }
}


