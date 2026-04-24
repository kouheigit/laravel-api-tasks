<?php

namespace Tests\Feature;

use App\Models\TaxiJob;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class TaxiJobSearchTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Schema::dropIfExists('taxi_jobs');

        Schema::create('taxi_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('company_name');
            $table->string('title');
            $table->string('employment_type');
            $table->string('prefecture');
            $table->string('city');
            $table->string('station')->nullable();
            $table->string('vehicle_type');
            $table->string('shift_type');
            $table->string('experience_level');
            $table->unsignedInteger('salary_min');
            $table->unsignedInteger('salary_max');
            $table->string('salary_label');
            $table->unsignedTinyInteger('day_shift_ratio')->default(50);
            $table->unsignedTinyInteger('night_shift_ratio')->default(50);
            $table->unsignedTinyInteger('match_score')->default(80);
            $table->unsignedTinyInteger('open_positions')->default(1);
            $table->unsignedSmallInteger('average_monthly_holidays')->default(8);
            $table->json('tags')->nullable();
            $table->json('benefits')->nullable();
            $table->json('requirements')->nullable();
            $table->text('catch_copy');
            $table->text('description');
            $table->text('training_program');
            $table->text('application_flow');
            $table->string('application_url')->nullable();
            $table->string('contact_phone')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->date('published_at');
            $table->timestamps();
        });
    }

    public function test_job_index_page_displays_seeded_job(): void
    {
        $job = TaxiJob::factory()->create([
            'slug' => 'tokyo-day-shift',
            'title' => '日勤タクシードライバー',
            'company_name' => '日の出交通',
        ]);

        $response = $this->get(route('taxi-jobs.index'));

        $response->assertOk();
        $response->assertSeeText('タクシー業界に特化した');
        $response->assertSeeText($job->title);
        $response->assertSeeText($job->company_name);
    }

    public function test_job_index_can_filter_by_prefecture(): void
    {
        TaxiJob::factory()->create([
            'slug' => 'tokyo-hire',
            'prefecture' => '東京都',
            'city' => '大田区',
            'title' => '東京限定求人',
            'is_featured' => false,
        ]);

        TaxiJob::factory()->create([
            'slug' => 'kanagawa-hire',
            'prefecture' => '神奈川県',
            'city' => '横浜市',
            'title' => '神奈川限定求人',
            'is_featured' => false,
        ]);

        $response = $this->get(route('taxi-jobs.index', ['prefecture' => '東京都']));

        $response->assertOk();
        $response->assertSeeText('東京限定求人');
        $response->assertDontSeeText('神奈川限定求人');
    }

    public function test_job_detail_page_uses_slug_routing(): void
    {
        $job = TaxiJob::factory()->create([
            'slug' => 'airport-night-driver',
            'title' => '空港送迎ナイトドライバー',
        ]);

        $response = $this->get(route('taxi-jobs.show', $job));

        $response->assertOk();
        $response->assertSee($job->title);
        $response->assertSee('この求人に応募する');
    }
}
