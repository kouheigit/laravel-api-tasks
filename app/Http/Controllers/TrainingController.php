<?php

namespace App\Http\Controllers;

use App\Models\TrainingResult;
use App\Models\TrainingScenario;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TrainingController extends Controller
{
    public function index()
    {
        return view('training.top');
    }

    public function normalScenarios()
    {
        $scenarios = TrainingScenario::where('mode_type', 'normal')->orderBy('scenario_id')->get();

        return view('training.normal_scenarios', compact('scenarios'));
    }

    public function publicScenarios()
    {
        $scenarios = TrainingScenario::where('mode_type', 'public_payment')->orderBy('scenario_id')->get();

        return view('training.public_scenarios', compact('scenarios'));
    }

    public function start(Request $request, TrainingScenario $scenario)
    {
        $result = TrainingResult::create([
            'result_id' => (string) Str::uuid(),
            'scenario_id' => $scenario->scenario_id,
            'started_at' => now(),
            'error_count' => 0,
            'score' => 0,
            'error_details' => [],
        ]);

        if ($scenario->mode_type === 'normal') {
            return view('training.normal_session', compact('scenario', 'result'));
        }

        return view('training.public_session', compact('scenario', 'result'));
    }

    public function finish(Request $request, TrainingResult $result)
    {
        $scenario = $result->scenario;

        $validated = $request->validate([
            'error_count' => ['nullable', 'integer', 'min:0'],
            'score' => ['nullable', 'integer', 'min:0', 'max:100'],
            'error_details' => ['nullable', 'array'],
            'chosen_payment_type' => ['nullable', 'string'],
        ]);

        $errorCount = $validated['error_count'] ?? 0;
        $score = $validated['score'] ?? 100;

        // 簡易自動判定：決済方法がシナリオと一致しているか
        if ($scenario && isset($validated['chosen_payment_type']) && $validated['chosen_payment_type'] !== '') {
            if ($validated['chosen_payment_type'] === $scenario->payment_type) {
                $errorCount = 0;
                $score = 100;
            } else {
                $errorCount = max($errorCount, 1);
                $score = min($score, 50);
            }
        }

        $result->update([
            'ended_at' => now(),
            'error_count' => $errorCount,
            'score' => $score,
            'error_details' => $validated['error_details'] ?? [],
        ]);

        return view('training.result', compact('scenario', 'result'));
    }
}

