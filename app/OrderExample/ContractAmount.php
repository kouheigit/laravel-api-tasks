<?php

class ContractAmout{
    private float $salesTaxRate;

    public function __construct(float $salesTaxRate)
    {
        $this->salesTaxRate = $salesTaxRate;
    }

    public function getSalesTaxRate(): float
    {
        return $this->salesRate;
    }
}

/*
 * class ContractAmount
{
    private float $salesTaxRate;

    public function __construct(float $salesTaxRate)
    {
        $this->salesTaxRate = $salesTaxRate;
    }

    public function getSalesTaxRate(): float
    {
        return $this->salesTaxRate;
    }
}
 */

/*
 *a
 NG例
 class ContractAmount
{
    public ?float $salesTaxRate = null;
}

$amount = new ContractAmount();
echo $amount->salesTaxRate; // null
 */
