<?php

final class Money
{
    public function __construct(
        public readonly int $amount,
        public readonly string $currency
    ) {}

    public function add(self $other): self
    {
        return new self(
            $this->amount + $other->amount,
            $this->currency
        );
    }
}

