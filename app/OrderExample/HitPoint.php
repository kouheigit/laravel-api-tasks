<?php

class HitPoint
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
