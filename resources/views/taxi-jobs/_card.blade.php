<article class="taxi-card taxi-glass rounded-[28px] border border-white/70 p-6">
    <div class="mb-4 flex items-start justify-between gap-4">
        <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{{ $job->company_name }}</p>
            <h3 class="mt-2 text-2xl font-black text-slate-900">{{ $job->title }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ $job->prefecture }} {{ $job->city }} / {{ $job->station ?: '駅情報なし' }}</p>
        </div>
        @if ($job->is_featured)
            <span class="rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-slate-900">注目求人</span>
        @endif
    </div>

    <p class="mb-5 text-sm leading-7 text-slate-700">{{ $job->catch_copy }}</p>

    <div class="taxi-stat-stripe rounded-2xl px-4 py-4 text-slate-900">
        <div class="flex items-end justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.22em]">想定年収レンジ</p>
                <p class="mt-2 text-3xl font-black">{{ number_format($job->salary_min) }} - {{ number_format($job->salary_max) }}</p>
            </div>
            <p class="text-sm font-semibold">{{ $job->salary_label }}</p>
        </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-2">
        <span class="taxi-pill rounded-full px-3 py-2 text-xs font-semibold">{{ $job->employment_type }}</span>
        <span class="taxi-pill rounded-full px-3 py-2 text-xs font-semibold">{{ $job->shift_type }}</span>
        <span class="taxi-pill rounded-full px-3 py-2 text-xs font-semibold">{{ $job->vehicle_type }}</span>
        <span class="taxi-pill rounded-full px-3 py-2 text-xs font-semibold">休日 {{ $job->average_monthly_holidays }}日</span>
    </div>

    <div class="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-slate-900 px-4 py-4 text-white">
        <div>
            <p class="text-[11px] uppercase tracking-[0.2em] text-white/60">日勤比率</p>
            <p class="mt-1 text-xl font-bold">{{ $job->day_shift_ratio }}%</p>
        </div>
        <div>
            <p class="text-[11px] uppercase tracking-[0.2em] text-white/60">夜勤比率</p>
            <p class="mt-1 text-xl font-bold">{{ $job->night_shift_ratio }}%</p>
        </div>
        <div>
            <p class="text-[11px] uppercase tracking-[0.2em] text-white/60">適合度</p>
            <p class="mt-1 text-xl font-bold">{{ $job->match_score }}</p>
        </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-2">
        @foreach (($job->tags ?? []) as $tag)
            <span class="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">{{ $tag }}</span>
        @endforeach
    </div>

    <div class="mt-6 flex items-center justify-between gap-3">
        <p class="text-sm text-slate-500">公開日 {{ $job->published_at->format('Y.m.d') }}</p>
        <a href="{{ route('taxi-jobs.show', $job) }}" class="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700">
            詳細を見る
        </a>
    </div>
</article>
