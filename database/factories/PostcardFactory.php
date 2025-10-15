<?php

namespace Database\Factories;

use App\Models\Postcard;
use App\Models\ScribeAccount;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Postcard>
 */
class PostcardFactory extends Factory
{
    protected $model = Postcard::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'headline' => fake()->sentence(),
            'message' => fake()->paragraph(),
            'scribe_account_id' => ScribeAccount::factory(),
        ];
    }
}

