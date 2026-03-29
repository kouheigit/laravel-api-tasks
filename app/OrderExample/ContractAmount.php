<?php
class ContractAmount
{
    public function __construct(private int $amountExcludingTax, private float $salesTaxRate,)
    {
        if ($amountExcludingTax < 0) {
            throw new InvalidArgumentException('税抜金額は0以上である必要があります。');
        }

        if ($salesTaxRate < 0) {
            throw new InvalidArgumentException('消費税率は0以上である必要があります。');
        }
    }

    public function amountIncludingTax(): int
    {
        return (int) round($this->amountExcludingTax * (1 + $this->salesTaxRate));
    }

    public function amountExcludingTax(): int
    {
        return $this->amountExcludingTax;
    }

    public function salesTaxRate(): float
    {
        return $this->salesTaxRate;
    }
}
