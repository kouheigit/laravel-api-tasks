<?php

namespace App\Http\Controllers;

use App\Models\TaxiJob;
use Illuminate\Http\Request;
use Illuminate\View\View;

class TaxiJobController extends Controller
{
    public function index(Request $request): View
    {
        $query = TaxiJob::query()->published()->latest('is_featured')->latest('published_at');

        if ($keyword = trim((string) $request->string('keyword'))) {
            $query->where(function ($builder) use ($keyword) {
                $builder
                    ->where('title', 'like', "%{$keyword}%")
                    ->orWhere('company_name', 'like', "%{$keyword}%")
                    ->orWhere('city', 'like', "%{$keyword}%")
                    ->orWhere('station', 'like', "%{$keyword}%")
                    ->orWhere('catch_copy', 'like', "%{$keyword}%");
            });
        }

        if ($prefecture = $request->string('prefecture')->toString()) {
            $query->where('prefecture', $prefecture);
        }

        if ($employmentType = $request->string('employment_type')->toString()) {
            $query->where('employment_type', $employmentType);
        }

        if ($shiftType = $request->string('shift_type')->toString()) {
            $query->where('shift_type', $shiftType);
        }

        if ($vehicleType = $request->string('vehicle_type')->toString()) {
            $query->where('vehicle_type', $vehicleType);
        }

        if ($minSalary = $request->integer('salary_min')) {
            $query->where('salary_max', '>=', $minSalary);
        }

        if ($request->boolean('featured_only')) {
            $query->where('is_featured', true);
        }

        $jobs = $query->paginate(9)->withQueryString();
        $featuredJobs = TaxiJob::query()->published()->where('is_featured', true)->latest('published_at')->take(3)->get();

        return view('taxi-jobs.index', [
            'jobs' => $jobs,
            'featuredJobs' => $featuredJobs,
            'filters' => $request->only([
                'keyword',
                'prefecture',
                'employment_type',
                'shift_type',
                'vehicle_type',
                'salary_min',
                'featured_only',
            ]),
            'filterOptions' => [
                'prefectures' => TaxiJob::query()->published()->select('prefecture')->distinct()->orderBy('prefecture')->pluck('prefecture'),
                'employmentTypes' => TaxiJob::query()->published()->select('employment_type')->distinct()->orderBy('employment_type')->pluck('employment_type'),
                'shiftTypes' => TaxiJob::query()->published()->select('shift_type')->distinct()->orderBy('shift_type')->pluck('shift_type'),
                'vehicleTypes' => TaxiJob::query()->published()->select('vehicle_type')->distinct()->orderBy('vehicle_type')->pluck('vehicle_type'),
            ],
        ]);
    }

    public function show(TaxiJob $taxiJob): View
    {
        $relatedJobs = TaxiJob::query()
            ->published()
            ->whereKeyNot($taxiJob->id)
            ->where('prefecture', $taxiJob->prefecture)
            ->latest('is_featured')
            ->latest('published_at')
            ->take(3)
            ->get();

        return view('taxi-jobs.show', [
            'job' => $taxiJob,
            'relatedJobs' => $relatedJobs,
        ]);
    }
}
