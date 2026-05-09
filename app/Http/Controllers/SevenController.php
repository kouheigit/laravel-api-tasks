<?php

namespace App\Http\Controllers;

use App\Models\SevenProduct;
use App\Models\SevenRegister;
use App\Models\SevenRegisterItem;
use Illuminate\Http\Request;

class SevenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sevenProducts = SevenProduct::where(function ($query) {
            $query->whereNull('category')
                ->orWhere(function ($query) {
                    $query->where('category', 'not like', '%セブンカフェ%')
                        ->where('category', 'not like', '%カフェ%');
                });
        })
            ->where(function ($query) {
                $query->whereNull('description')
                    ->orWhere('description', 'not like', '%セブンカフェ%');
            })
            ->where(function ($query) {
                $query->whereNull('category')
                    ->orWhere('category', 'not like', '%ホットスナック%');
            })
            ->where(function ($query) {
                $query->whereNull('description')
                    ->orWhere('description', 'not like', '%ホットスナック%');
            })
            ->where(function ($query) {
                $query->whereNull('category')
                    ->orWhere('category', 'not like', '%中華まん%');
            })
            ->orderBy('id')
            ->get();
        $nikumanProducts = SevenProduct::where('category', '中華まん')->orderBy('id')->get();
        $hotSnackProducts = SevenProduct::where('description', 'like', '%ホットスナック%')->orderBy('id')->get();
        $cafeProducts = SevenProduct::where(function ($query) {
            $query->where('category', 'like', '%セブンカフェ%')
                ->orWhere('category', 'like', '%カフェ%')
                ->orWhere('description', 'like', '%セブンカフェ%');
        })->orderBy('id')->get();

        return view('Seven.index', compact('sevenProducts', 'nikumanProducts', 'hotSnackProducts', 'cafeProducts'));
    }

    /**
     * 中華まんカテゴリの商品一覧を別ウィンドウで表示。
     */
    public function nikuman()
    {
        $nikumanProducts = SevenProduct::where('category', '中華まん')->orderBy('id')->get();
        return view('Seven.nikuman', compact('nikumanProducts'));
    }

    /**
     * 責任者解除（会計開始）。DBには記録せず、会計完了時のみ seven_registers を作成する。
     */
    public function startRegister(Request $request)
    {
        $request->validate([
            'responsible_number' => ['required', 'integer'],
        ]);

        return response()->json(['ok' => true]);
    }

    /**
     * 会計に商品を1件追加（同一商品の場合は数量を加算）。非同期用。
     */
    public function addRegisterItem(Request $request)
    {
        $validated = $request->validate([
            'register_id' => ['required', 'integer', 'exists:seven_registers,id'],
            'product_id' => ['required', 'integer', 'exists:seven_products,id'],
            'product_name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'quantity' => ['sometimes', 'integer', 'min:1'],
        ]);

        $qty = $validated['quantity'] ?? 1;

        $item = SevenRegisterItem::where('register_id', $validated['register_id'])
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($item) {
            $item->quantity += $qty;
            $item->subtotal = $item->price * $item->quantity;
            $item->save();
        } else {
            $item = SevenRegisterItem::create([
                'register_id' => $validated['register_id'],
                'product_id' => $validated['product_id'],
                'product_name' => $validated['product_name'],
                'price' => $validated['price'],
                'quantity' => $qty,
                'subtotal' => $validated['price'] * $qty,
            ]);
        }

        return response()->json([
            'product_id' => $item->product_id,
            'product_name' => $item->product_name,
            'price' => $item->price,
            'quantity' => $item->quantity,
            'subtotal' => $item->subtotal,
        ]);
    }

    /**
     * 会計の明細から該当商品を1個取り消し（数量-1、0なら削除）。非同期用。
     */
    public function decrementRegisterItem(Request $request)
    {
        $validated = $request->validate([
            'register_id' => ['required', 'integer', 'exists:seven_registers,id'],
            'product_id' => ['required', 'integer', 'exists:seven_products,id'],
        ]);

        $item = SevenRegisterItem::where('register_id', $validated['register_id'])
            ->where('product_id', $validated['product_id'])
            ->first();

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        if ($item->quantity > 1) {
            $item->quantity -= 1;
            $item->subtotal = $item->price * $item->quantity;
            $item->save();

            return response()->json([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'subtotal' => $item->subtotal,
            ]);
        }

        $productId = $item->product_id;
        $item->delete();

        return response()->json([
            'product_id' => $productId,
            'quantity' => 0,
            'subtotal' => 0,
        ]);
    }

    /**
     * 会計完了時に seven_register と seven_register_items を一括で作成。未完了会計のゴミデータが残らない。
     */
    public function finishRegister(Request $request)
    {
        $validated = $request->validate([
            'responsible_number' => ['required', 'integer'],
            'customer_type' => ['required', 'integer'],
            'total_amount' => ['required', 'integer', 'min:0'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:seven_products,id'],
            'items.*.product_name' => ['required', 'string', 'max:255'],
            'items.*.price' => ['required', 'integer', 'min:0'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $register = null;
        \DB::transaction(function () use ($validated, &$register) {
            $register = SevenRegister::create([
                'customer_type' => $validated['customer_type'],
                'total_amount' => $validated['total_amount'],
                'responsible_number' => $validated['responsible_number'],
            ]);

            foreach ($validated['items'] as $row) {
                $qty = (int) $row['quantity'];
                $price = (int) $row['price'];
                SevenRegisterItem::create([
                    'register_id' => $register->id,
                    'product_id' => $row['product_id'],
                    'product_name' => $row['product_name'],
                    'price' => $price,
                    'quantity' => $qty,
                    'subtotal' => $price * $qty,
                ]);
            }
        });

        return response()->json([
            'register_id' => $register->id,
            'customer_type' => $register->customer_type,
            'total_amount' => $register->total_amount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /*
        $number = $request->input('number'); // 今は常に「1」が来る想定
        $current = $request->session()->get('number', '');
        $next = $current.$number;

        return redirect()->route('seven.index')->with('number', $next);*/
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
