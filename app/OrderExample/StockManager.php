<?php

namespace App\OrderExample;

class StockManager
{
    private int $stock = 0;
    private bool $outOfStock = false;

    public function setStock(int $stock): void
    {
        $this->stock = max(0, $stock);
        $this->outOfStock = ($this->stock === 0);
    }

    public function getStock(): int
    {
        return $this->stock;
    }

    public function isOutOfStock(): bool
    {
        return $this->outOfStock;
    }

    public function decreaseStock(int $quantity): void
    {
        $this->stock -= $quantity;

        if ($this->stock < 0) {
            $this->stock = 0;
            $this->markAsOutOfStock();
        }
    }

    private function markAsOutOfStock(): void
    {
        // 在庫切れ処理
        $this->outOfStock = true;
    }
}
