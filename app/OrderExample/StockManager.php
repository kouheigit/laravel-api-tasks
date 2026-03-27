<?php

class StockManager
{
    private int $stock = 0;

    public function decreaseStock(int $quantity): void
    {
        $this->stock -=$quantity;

        if($this->stock < 0) {
            $this->stock = 0;
            $this->markAsOutOfStock();
        }
    }
    private function markAsOutOfStock(): void
    {
        // 在庫切れ処理
    }
}
/*いい例
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
/*悪い例
class MemoryStateManager
{
    private int $intValue01 = 0;

    public function changeValue01(int $changeValue): void
    {
        $this->intValue01 -= $changeValue;

        if ($this->intValue01 < 0) {
            $this->intValue01 = 0;
            $this->updateState02Flag();
        }
    }

    private function updateState02Flag(): void
    {
        // 何してるかわからん
    }
}*/
