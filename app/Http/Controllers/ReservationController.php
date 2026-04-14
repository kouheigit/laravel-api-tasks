<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public const PAYMENT_STATUS_FAILING = 'failing';
    public const PAYMENT_STATUS_PENDING = 'pending';
    public const PAYMENT_STATUS_SUCCESS = 'success';

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $reservations = DB::table('reservations')
            ->orderByDesc('id')
            ->paginate(10);

        return response()->json($reservations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'reserved_at' => ['required', 'date'],
            'note' => ['nullable', 'string'],

            // 画像の「決済入力」バリデーション
            'payment' => ['required', 'integer', 'min:0'],
            'card_number' => ['required_if:payment,1', 'string'],
            'card_expire' => ['required_if:payment,1', 'string'],
            'security_code' => ['required_if:payment,1', 'string'],
            'token' => ['nullable', 'string'],
        ]);

        $id = DB::table('reservations')->insertGetId([
            'name' => $data['name'],
            'email' => $data['email'],
            'reserved_at' => $data['reserved_at'],
            'note' => $data['note'] ?? null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $reservation = DB::table('reservations')->where('id', $id)->first();

        // DBスキーマ不明のため、決済ステータスはレスポンス上で返す（保存は次工程で）
        $paymentStatus = $this->inferPaymentStatus($data);

        return response()->json([
            'reservation' => $reservation,
            'payment_status' => $paymentStatus,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $reservation = DB::table('reservations')->where('id', $id)->first();

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        return response()->json($reservation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $reservation = DB::table('reservations')->where('id', $id)->first();

        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        $data = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'string', 'email', 'max:255'],
            'reserved_at' => ['sometimes', 'date'],
            'note' => ['nullable', 'string'],
        ]);

        DB::table('reservations')->where('id', $id)->update([
            ...$data,
            'updated_at' => now(),
        ]);

        $updated = DB::table('reservations')->where('id', $id)->first();

        return response()->json($updated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $deleted = DB::table('reservations')->where('id', $id)->delete();

        if ($deleted === 0) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        return response()->json(null, 204);
    }

    /**
     * 画像の断片で示されていた「決済処理（予約に紐づく）」相当。
     * 実決済SDK呼び出しは次工程で差し替え前提のスタブ。
     */
    public function pay(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'payment' => ['required', 'integer', 'min:0'],
            'card_number' => ['required_if:payment,1', 'string'],
            'card_expire' => ['required_if:payment,1', 'string'],
            'security_code' => ['required_if:payment,1', 'string'],
            'token' => ['nullable', 'string'],
        ]);

        $user = Auth::user();
        $reservation = DB::table('reservations')->where('id', $id)->first();

        if (!$reservation) {
            return response()->json(['message' => '予約情報がありません'], 404);
        }

        // SDK 未接続のため、現状は「トークンがあれば成功、それ以外は保留」で返す
        $paymentStatus = $this->inferPaymentStatus($validated);

        return response()->json([
            'user' => $user,
            'reservation' => $reservation,
            'payment_status' => $paymentStatus,
        ]);
    }

    private function inferPaymentStatus(array $validated): string
    {
        $payment = (int) ($validated['payment'] ?? 0);

        if ($payment !== 1) {
            return self::PAYMENT_STATUS_SUCCESS;
        }

        return !empty($validated['token'])
            ? self::PAYMENT_STATUS_SUCCESS
            : self::PAYMENT_STATUS_PENDING;
    }
}
