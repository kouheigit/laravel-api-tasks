<?php

namespace App\Http\Controllers;

use App\OrderExample\StockManager;
use Illuminate\Http\Request;

class OrderExampleController extends Controller
{
    public function index(Request $request)
    {
        return view('order_example.index', [
            'stock' => 0,
            'status' => null,
        ]);
    }

    public function setStock(Request $request)
    {
        $validated = $request->validate([
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $stockManager = new StockManager();
        $stockManager->setStock((int) $validated['stock']);

        return view('order_example.index', [
            'stock' => $stockManager->getStock(),
            'status' => '在庫数を更新しました。',
        ]);
    }

    public function decrease(Request $request)
    {
        $validated = $request->validate([
            'stock' => ['required', 'integer', 'min:0'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $stockManager = new StockManager();
        $stockManager->setStock((int) $validated['stock']);
        $stockManager->decreaseStock((int) $validated['quantity']);

        return view('order_example.index', [
            'stock' => $stockManager->getStock(),
            'status' => $stockManager->isOutOfStock() ? '在庫切れになりました。' : '在庫を減算しました。',
        ]);
    }
}

