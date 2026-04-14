<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStockMovementRequest;
use App\Models\Item;
use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;

class StockMovementController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockMovementRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated): void {
                $item = Item::query()
                    ->lockForUpdate()
                    ->findOrFail($validated['item_id']);

                $quantity = (int) $validated['quantity'];

                if ($validated['type'] === 'out' && $item->stock < $quantity) {
                    throw new \RuntimeException('在庫が不足しているため出庫できません。');
                }

                if ($validated['type'] === 'in') {
                    $item->increment('stock', $quantity);
                } else {
                    $item->decrement('stock', $quantity);
                }

                StockMovement::create($validated);
            });
        } catch (\RuntimeException $exception) {
            return redirect()
                ->route('items.show', $validated['item_id'])
                ->withErrors(['quantity' => $exception->getMessage()])
                ->withInput();
        }

        return redirect()
            ->route('items.show', $validated['item_id'])
            ->with('success', '入出庫を記録しました。');
    }
}
