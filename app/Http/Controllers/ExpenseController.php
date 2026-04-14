<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Models\Category;
use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $selectedMonth = $request->string('month')->toString();

        if ($selectedMonth === '') {
            $selectedMonth = now()->format('Y-m');
        }

        [$year, $month] = array_pad(explode('-', $selectedMonth), 2, null);
        $targetDate = Carbon::createFromDate((int) $year, (int) $month, 1);
        $startOfMonth = $targetDate->copy()->startOfMonth()->toDateString();
        $endOfMonth = $targetDate->copy()->endOfMonth()->toDateString();

        $expensesQuery = Expense::query()
            ->with('category')
            ->whereBetween('spent_on', [$startOfMonth, $endOfMonth]);

        $expenses = (clone $expensesQuery)
            ->orderByDesc('spent_on')
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        $monthlyTotal = (clone $expensesQuery)->sum('amount');

        return view('expenses.index', [
            'expenses' => $expenses,
            'selectedMonth' => $targetDate->format('Y-m'),
            'monthlyTotal' => $monthlyTotal,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::query()->orderBy('name')->get();

        return view('expenses.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExpenseRequest $request)
    {
        $expense = Expense::create($request->validated());

        return redirect()
            ->route('expenses.show', $expense)
            ->with('success', '支出を登録しました。');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        $expense->load('category');

        return view('expenses.show', compact('expense'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        $categories = Category::query()->orderBy('name')->get();

        return view('expenses.edit', compact('expense', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        $expense->update($request->validated());

        return redirect()
            ->route('expenses.show', $expense)
            ->with('success', '支出を更新しました。');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        $expense->delete();

        return redirect()
            ->route('expenses.index')
            ->with('success', '支出を削除しました。');
    }
}
