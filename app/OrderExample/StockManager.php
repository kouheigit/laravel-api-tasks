<?php

namespace App\OrderExample;

class StockManager
{
    private int $stock = 0;

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
    }
}
