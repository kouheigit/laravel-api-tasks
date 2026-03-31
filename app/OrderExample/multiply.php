<?php

public function multiplyByRate(float $rate): self
{
    if ($rate < 0) {
        throw new InvalidArgumentException('倍率は0以上である必要があります。');
    }

    return new self(
        (int) round($this->amount * $rate),
        $this->currency
    );
}
