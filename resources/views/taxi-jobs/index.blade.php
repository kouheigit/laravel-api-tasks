<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>タクシー求人検索 | Taxi Shift Finder</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="taxi-jobs-shell">
        <div class="taxi-grid">
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <header class="taxi-glass overflow-hidden rounded-[36px] p-6 lg:p-10">
                    <div class="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
                        <div>
                            <p class="taxi-hero-badge text-xs font-bold uppercase text-slate-500">Taxi Shift Finder</p>
                            <h1 class="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-900 lg:text-6xl">
                                タクシー業界に特化した
                                <span class="block text-amber-500">求人検索システム</span>
                            </h1>
                            <p class="mt-5 max-w-2xl text-base leading-8 text-slate-600 lg:text-lg">
                                地域、勤務形態、車両タイプ、給与条件で比較しながら、未経験向けからハイヤー案件まで一画面で探せます。
                            </p>
                            <div class="mt-8 flex flex-wrap gap-3">
                                <span class="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">掲載件数 {{ $jobs->total() }}件</span>
                                <span class="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700">注目求人 {{ $featuredJobs->count() }}件</span>
                            </div>
                        </div>
                        <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                            <div class="rounded-[24px] bg-slate-900 p-5 text-white">
                                <p class="text-xs uppercase tracking-[0.22em] text-white/60">平均最高月給</p>
                                <p class="mt-3 text-3xl font-black">¥{{ number_format((int) ceil($jobs->getCollection()->avg('salary_max'))) }}</p>
                            </div>
                            <div class="rounded-[24px] bg-amber-300 p-5 text-slate-900">
                                <p class="text-xs uppercase tracking-[0.22em] text-slate-700">未経験歓迎</p>
                                <p class="mt-3 text-3xl font-black">{{ $jobs->getCollection()->where('experience_level', '未経験歓迎')->count() }}件</p>
                            </div>
                            <div class="rounded-[24px] bg-sky-100 p-5 text-slate-900">
                                <p class="text-xs uppercase tracking-[0.22em] text-slate-700">表示中</p>
                                <p class="mt-3 text-3xl font-black">{{ $jobs->count() }}件</p>
                            </div>
                        </div>
                    </div>
                </header>

                <section class="mt-8 grid gap-8 lg:grid-cols-[330px_1fr]">
                    <aside class="taxi-glass rounded-[30px] p-6">
                        <div class="mb-6">
                            <h2 class="taxi-section-title text-xl font-black text-slate-900">検索条件</h2>
                            <p class="mt-3 text-sm leading-7 text-slate-600">条件を組み合わせて、希望に近い案件だけを絞り込みます。</p>
                        </div>

                        <form method="GET" action="{{ route('taxi-jobs.index') }}" class="space-y-5">
                            <div>
                                <label for="keyword" class="mb-2 block text-sm font-bold text-slate-700">キーワード</label>
                                <input id="keyword" name="keyword" value="{{ $filters['keyword'] ?? '' }}" placeholder="会社名、駅名、特徴など" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none ring-0 transition focus:border-slate-900">
                            </div>

                            <div>
                                <label for="prefecture" class="mb-2 block text-sm font-bold text-slate-700">都道府県</label>
                                <select id="prefecture" name="prefecture" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none">
                                    <option value="">指定なし</option>
                                    @foreach ($filterOptions['prefectures'] as $prefecture)
                                        <option value="{{ $prefecture }}" @selected(($filters['prefecture'] ?? '') === $prefecture)>{{ $prefecture }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label for="employment_type" class="mb-2 block text-sm font-bold text-slate-700">雇用形態</label>
                                <select id="employment_type" name="employment_type" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none">
                                    <option value="">指定なし</option>
                                    @foreach ($filterOptions['employmentTypes'] as $employmentType)
                                        <option value="{{ $employmentType }}" @selected(($filters['employment_type'] ?? '') === $employmentType)>{{ $employmentType }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label for="shift_type" class="mb-2 block text-sm font-bold text-slate-700">勤務帯</label>
                                <select id="shift_type" name="shift_type" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none">
                                    <option value="">指定なし</option>
                                    @foreach ($filterOptions['shiftTypes'] as $shiftType)
                                        <option value="{{ $shiftType }}" @selected(($filters['shift_type'] ?? '') === $shiftType)>{{ $shiftType }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label for="vehicle_type" class="mb-2 block text-sm font-bold text-slate-700">車両タイプ</label>
                                <select id="vehicle_type" name="vehicle_type" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none">
                                    <option value="">指定なし</option>
                                    @foreach ($filterOptions['vehicleTypes'] as $vehicleType)
                                        <option value="{{ $vehicleType }}" @selected(($filters['vehicle_type'] ?? '') === $vehicleType)>{{ $vehicleType }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div>
                                <label for="salary_min" class="mb-2 block text-sm font-bold text-slate-700">最低希望月給</label>
                                <select id="salary_min" name="salary_min" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none">
                                    <option value="">指定なし</option>
                                    @foreach ([350000, 400000, 450000, 500000, 600000] as $salary)
                                        <option value="{{ $salary }}" @selected((string) ($filters['salary_min'] ?? '') === (string) $salary)>¥{{ number_format($salary) }}以上</option>
                                    @endforeach
                                </select>
                            </div>

                            <label class="flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3">
                                <input type="checkbox" name="featured_only" value="1" @checked(!empty($filters['featured_only'])) class="rounded border-slate-300 text-slate-900 focus:ring-slate-900">
                                <span class="text-sm font-semibold text-slate-700">注目求人のみ表示</span>
                            </label>

                            <div class="flex gap-3">
                                <button type="submit" class="flex-1 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700">検索する</button>
                                <a href="{{ route('taxi-jobs.index') }}" class="rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">リセット</a>
                            </div>
                        </form>
                    </aside>

                    <div class="space-y-8">
                        @if ($featuredJobs->isNotEmpty())
                            <section class="taxi-glass rounded-[30px] p-6">
                                <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                    <div>
                                        <h2 class="taxi-section-title text-xl font-black text-slate-900">今週の注目求人</h2>
                                        <p class="mt-3 text-sm leading-7 text-slate-600">応募数と条件バランスの高い案件を優先表示しています。</p>
                                    </div>
                                </div>
                                <div class="mt-6 grid gap-4 lg:grid-cols-3">
                                    @foreach ($featuredJobs as $featuredJob)
                                        <a href="{{ route('taxi-jobs.show', $featuredJob) }}" class="rounded-[24px] border border-slate-200 bg-white px-5 py-5 transition hover:-translate-y-1 hover:border-amber-300">
                                            <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{{ $featuredJob->company_name }}</p>
                                            <h3 class="mt-3 text-lg font-black text-slate-900">{{ $featuredJob->title }}</h3>
                                            <p class="mt-2 text-sm text-slate-600">{{ $featuredJob->prefecture }} {{ $featuredJob->city }}</p>
                                            <p class="mt-4 text-sm font-semibold text-amber-600">最大 ¥{{ number_format($featuredJob->salary_max) }}</p>
                                        </a>
                                    @endforeach
                                </div>
                            </section>
                        @endif

                        <section>
                            <div class="mb-5 flex items-end justify-between gap-4">
                                <div>
                                    <h2 class="text-2xl font-black text-slate-900">検索結果</h2>
                                    <p class="mt-2 text-sm text-slate-600">{{ $jobs->total() }}件の求人が見つかりました。</p>
                                </div>
                            </div>

                            @if ($jobs->isEmpty())
                                <div class="taxi-glass rounded-[30px] p-10 text-center">
                                    <p class="text-2xl font-black text-slate-900">条件に一致する求人はありませんでした。</p>
                                    <p class="mt-4 text-sm leading-7 text-slate-600">勤務帯や最低月給条件を少し広げると、候補が見つかりやすくなります。</p>
                                </div>
                            @else
                                <div class="grid gap-6 xl:grid-cols-2">
                                    @foreach ($jobs as $job)
                                        @include('taxi-jobs._card', ['job' => $job])
                                    @endforeach
                                </div>
                                <div class="mt-8">
                                    {{ $jobs->links() }}
                                </div>
                            @endif
                        </section>
                    </div>
                </section>
            </div>
        </div>
    </body>
</html>
