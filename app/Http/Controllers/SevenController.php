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
        $sevenProducts = SevenProduct::orderBy('id')->get();
        $nikumanProducts = SevenProduct::where('description', 'like', '%肉まん%')->orderBy('id')->get();
        $hotSnackProducts = SevenProduct::where('description', 'like', '%ホットスナック%')->orderBy('id')->get();
        return view('Seven.index', compact('sevenProducts', 'nikumanProducts', 'hotSnackProducts'));
    }

    /**
     * description に「肉まん」を含む商品一覧を別ウィンドウで表示。
     */
    public function nikuman()
    {
        $nikumanProducts = SevenProduct::where('description', 'like', '%肉まん%')->orderBy('id')->get();
        return view('Seven.nikuman', compact('nikumanProducts'));
    }

    /**
     * 責任者番号を送信し、新規会計（seven_register）を作成。非同期用。
     */
    public function startRegister(Request $request)
    {
        $validated = $request->validate([
            'responsible_number' => ['required', 'integer'],
        ]);

        $register = SevenRegister::create([
            'customer_type' => 0,
            'total_amount' => 0,
            'responsible_number' => $validated['responsible_number'],
        ]);

        return response()->json([
            'register_id' => $register->id,
        ]);
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
