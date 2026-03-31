<?php

final class HitPoint
{
    private const MIN = 0;

    private function __construct(private int $amount)
    {
        if($amount < self::MIN){
            throw new InvalidArgumentException('HPは0以上である必要があります');
        }
    }
    public function damage(int $damageAmount): self
    {
        if($damageAmount < 0){
            throw new InvalidArgumentException('ダメージは0以上である必要があります');
        }
        $nextAmount = $this->amount - $damageAmount;

        return new self(max(self::MIN,$nextAmount));
    }
    public function isZero(): bool
    {
        return $this->amount === self::MIN;
    }
    public function value(): int
    {
        return $this->amount;
    }
}


/*
 * class HitPoint
{
    private const MAX = 999;

    public function __construct(private int $value) {}

    public function damage(int $amount): self
    {
        return new self(max(0, $this->value - $amount));
    }

    public function heal(int $amount): self
    {
        return new self(min(self::MAX, $this->value + $amount));
    }

    public function value(): int
    {
        return $this->value;
    }
}
 */
