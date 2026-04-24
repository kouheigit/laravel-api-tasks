<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $job->title }} | タクシー求人詳細</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="taxi-jobs-shell">
        <div class="taxi-grid">
            <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <a href="{{ route('taxi-jobs.index') }}" class="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700">求人一覧へ戻る</a>
                    <div class="flex flex-wrap gap-2">
                        <span class="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">{{ $job->employment_type }}</span>
                        @if ($job->is_featured)
                            <span class="rounded-full bg-amber-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-900">注目求人</span>
                        @endif
                    </div>
                </div>

                <section class="taxi-glass rounded-[36px] p-6 lg:p-10">
                    <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p class="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">{{ $job->company_name }}</p>
                            <h1 class="mt-4 text-4xl font-black leading-tight text-slate-900 lg:text-5xl">{{ $job->title }}</h1>
                            <p class="mt-5 max-w-3xl text-base leading-8 text-slate-600">{{ $job->catch_copy }}</p>

                            <div class="mt-8 flex flex-wrap gap-3">
                                @foreach (($job->tags ?? []) as $tag)
                                    <span class="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-900">{{ $tag }}</span>
                                @endforeach
                            </div>
                        </div>

                        <div class="rounded-[28px] bg-slate-900 p-6 text-white">
                            <p class="text-xs uppercase tracking-[0.22em] text-white/60">月給レンジ</p>
                            <p class="mt-3 text-4xl font-black">¥{{ number_format($job->salary_min) }}</p>
                            <p class="mt-1 text-lg font-semibold text-white/70">- ¥{{ number_format($job->salary_max) }}</p>

                            <dl class="mt-6 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <dt class="text-white/60">勤務地</dt>
                                    <dd class="mt-1 font-semibold">{{ $job->prefecture }} {{ $job->city }}</dd>
                                </div>
                                <div>
                                    <dt class="text-white/60">最寄駅</dt>
                                    <dd class="mt-1 font-semibold">{{ $job->station ?: '要確認' }}</dd>
                                </div>
                                <div>
                                    <dt class="text-white/60">勤務帯</dt>
                                    <dd class="mt-1 font-semibold">{{ $job->shift_type }}</dd>
                                </div>
                                <div>
                                    <dt class="text-white/60">車両</dt>
                                    <dd class="mt-1 font-semibold">{{ $job->vehicle_type }}</dd>
                                </div>
                                <div>
                                    <dt class="text-white/60">募集人数</dt>
                                    <dd class="mt-1 font-semibold">{{ $job->open_positions }}名</dd>
                                </div>
                                <div>
                                    <dt class="text-white/60">休日</dt>
                                    <dd class="mt-1 font-semibold">月{{ $job->average_monthly_holidays }}日</dd>
                                </div>
                            </dl>

                            <div class="mt-8 flex flex-col gap-3">
                                <a href="{{ $job->application_url ?: '#' }}" class="rounded-full bg-amber-300 px-5 py-4 text-center text-sm font-black text-slate-900">この求人に応募する</a>
                                <p class="text-center text-sm text-white/60">お問い合わせ {{ $job->contact_phone ?: '掲載企業へご確認ください' }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
                    <div class="space-y-6">
                        <article class="taxi-detail-panel rounded-[30px] p-6 lg:p-8">
                            <h2 class="taxi-section-title text-2xl font-black text-slate-900">仕事内容</h2>
                            <p class="mt-5 text-sm leading-8 text-slate-700">{{ $job->description }}</p>
                        </article>

                        <article class="taxi-detail-panel rounded-[30px] p-6 lg:p-8">
                            <h2 class="taxi-section-title text-2xl font-black text-slate-900">研修プログラム</h2>
                            <p class="mt-5 text-sm leading-8 text-slate-700">{{ $job->training_program }}</p>
                        </article>

                        <article class="taxi-detail-panel rounded-[30px] p-6 lg:p-8">
                            <h2 class="taxi-section-title text-2xl font-black text-slate-900">応募の流れ</h2>
                            <p class="mt-5 text-sm leading-8 text-slate-700">{{ $job->application_flow }}</p>
                        </article>
                    </div>

                    <aside class="space-y-6">
                        <section class="taxi-detail-panel rounded-[30px] p-6">
                            <h2 class="text-lg font-black text-slate-900">応募条件</h2>
                            <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                                @foreach (($job->requirements ?? []) as $requirement)
                                    <li class="rounded-2xl bg-white px-4 py-3">{{ $requirement }}</li>
                                @endforeach
                            </ul>
                        </section>

                        <section class="taxi-detail-panel rounded-[30px] p-6">
                            <h2 class="text-lg font-black text-slate-900">待遇・福利厚生</h2>
                            <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                                @foreach (($job->benefits ?? []) as $benefit)
                                    <li class="rounded-2xl bg-white px-4 py-3">{{ $benefit }}</li>
                                @endforeach
                            </ul>
                        </section>

                        <section class="taxi-detail-panel rounded-[30px] p-6">
                            <h2 class="text-lg font-black text-slate-900">向いている候補者像</h2>
                            <div class="mt-4 rounded-[24px] bg-amber-50 p-5">
                                <p class="text-sm leading-7 text-slate-700">{{ $job->experience_level }}</p>
                                <p class="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">適合スコア {{ $job->match_score }}</p>
                            </div>
                        </section>
                    </aside>
                </section>

                @if ($relatedJobs->isNotEmpty())
                    <section class="mt-8 taxi-glass rounded-[30px] p-6">
                        <h2 class="taxi-section-title text-2xl font-black text-slate-900">同じエリアの関連求人</h2>
                        <div class="mt-6 grid gap-4 lg:grid-cols-3">
                            @foreach ($relatedJobs as $relatedJob)
                                <a href="{{ route('taxi-jobs.show', $relatedJob) }}" class="rounded-[24px] border border-slate-200 bg-white px-5 py-5 transition hover:-translate-y-1">
                                    <p class="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">{{ $relatedJob->company_name }}</p>
                                    <h3 class="mt-3 text-lg font-black text-slate-900">{{ $relatedJob->title }}</h3>
                                    <p class="mt-2 text-sm text-slate-600">{{ $relatedJob->city }} / {{ $relatedJob->shift_type }}</p>
                                    <p class="mt-4 text-sm font-semibold text-amber-600">最大 ¥{{ number_format($relatedJob->salary_max) }}</p>
                                </a>
                            @endforeach
                        </div>
                    </section>
                @endif
            </div>
        </div>
    </body>
</html>
