<?php

namespace Tests\Feature;

use App\Models\Postcard;
use App\Models\ScribeAccount;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostcardApiV2Test extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $scribeAccount;

    protected function setUp(): void
    {
        parent::setUp();
        
        // テスト用のScribeAccountを作成
        $this->scribeAccount = ScribeAccount::factory()->create();
    }

    /**
     * ポストカード一覧の取得テスト
     */
    public function test_can_get_postcard_list(): void
    {
        // テストデータを作成
        Postcard::factory()->count(15)->create([
            'scribe_account_id' => $this->scribeAccount->id
        ]);

        $response = $this->actingAs($this->scribeAccount)
            ->getJson('/api/v2/postcards');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'headline',
                        'message',
                        'scribe' => ['id', 'name'],
                        'created'
                    ]
                ],
                'links',
                'meta'
            ]);
    }

    /**
     * ポストカードの新規作成テスト
     */
    public function test_can_create_postcard(): void
    {
        $postcardData = [
            'headline' => 'テスト見出し',
            'message' => 'テストメッセージ',
            'scribe_account_id' => $this->scribeAccount->id
        ];

        $response = $this->actingAs($this->scribeAccount)
            ->postJson('/api/v2/postcards', $postcardData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'headline',
                    'message',
                    'scribe' => ['id', 'name'],
                    'created'
                ]
            ]);

        $this->assertDatabaseHas('postcards', [
            'headline' => 'テスト見出し',
            'message' => 'テストメッセージ'
        ]);
    }

    /**
     * 個別のポストカード取得テスト
     */
    public function test_can_get_single_postcard(): void
    {
        $postcard = Postcard::factory()->create([
            'scribe_account_id' => $this->scribeAccount->id,
            'headline' => '個別テスト見出し',
            'message' => '個別テストメッセージ'
        ]);

        $response = $this->actingAs($this->scribeAccount)
            ->getJson("/api/v2/postcards/{$postcard->id}");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $postcard->id,
                    'headline' => '個別テスト見出し',
                    'message' => '個別テストメッセージ'
                ]
            ]);
    }

    /**
     * ポストカードの更新テスト
     */
    public function test_can_update_postcard(): void
    {
        $postcard = Postcard::factory()->create([
            'scribe_account_id' => $this->scribeAccount->id,
            'headline' => '更新前見出し',
            'message' => '更新前メッセージ'
        ]);

        $updateData = [
            'headline' => '更新後見出し',
            'message' => '更新後メッセージ'
        ];

        $response = $this->actingAs($this->scribeAccount)
            ->putJson("/api/v2/postcards/{$postcard->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'headline' => '更新後見出し',
                    'message' => '更新後メッセージ'
                ]
            ]);

        $this->assertDatabaseHas('postcards', [
            'id' => $postcard->id,
            'headline' => '更新後見出し',
            'message' => '更新後メッセージ'
        ]);
    }

    /**
     * ポストカードの削除テスト
     */
    public function test_can_delete_postcard(): void
    {
        $postcard = Postcard::factory()->create([
            'scribe_account_id' => $this->scribeAccount->id
        ]);

        $response = $this->actingAs($this->scribeAccount)
            ->deleteJson("/api/v2/postcards/{$postcard->id}");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Deleted'
            ]);

        $this->assertDatabaseMissing('postcards', [
            'id' => $postcard->id
        ]);
    }

    /**
     * 未認証ユーザーがアクセスできないことをテスト
     */
    public function test_unauthenticated_user_cannot_access_postcards(): void
    {
        $response = $this->getJson('/api/v2/postcards');
        $response->assertStatus(401);
    }

    /**
     * バリデーションエラーのテスト（見出しが必須）
     */
    public function test_headline_is_required(): void
    {
        $postcardData = [
            'message' => 'メッセージのみ',
            'scribe_account_id' => $this->scribeAccount->id
        ];

        $response = $this->actingAs($this->scribeAccount)
            ->postJson('/api/v2/postcards', $postcardData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['headline']);
    }

    /**
     * バリデーションエラーのテスト（メッセージが必須）
     */
    public function test_message_is_required(): void
    {
        $postcardData = [
            'headline' => '見出しのみ',
            'scribe_account_id' => $this->scribeAccount->id
        ];

        $response = $this->actingAs($this->scribeAccount)
            ->postJson('/api/v2/postcards', $postcardData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['message']);
    }

    /**
     * 他人のポストカードを更新できないことをテスト
     */
    public function test_cannot_update_other_users_postcard(): void
    {
        $otherScribeAccount = ScribeAccount::factory()->create();
        
        $postcard = Postcard::factory()->create([
            'scribe_account_id' => $otherScribeAccount->id
        ]);

        $updateData = [
            'headline' => '不正な更新',
            'message' => '不正な更新メッセージ'
        ];

        $response = $this->actingAs($this->scribeAccount)
            ->putJson("/api/v2/postcards/{$postcard->id}", $updateData);

        $response->assertStatus(403);
    }

    /**
     * 他人のポストカードを削除できないことをテスト
     */
    public function test_cannot_delete_other_users_postcard(): void
    {
        $otherScribeAccount = ScribeAccount::factory()->create();
        
        $postcard = Postcard::factory()->create([
            'scribe_account_id' => $otherScribeAccount->id
        ]);

        $response = $this->actingAs($this->scribeAccount)
            ->deleteJson("/api/v2/postcards/{$postcard->id}");

        $response->assertStatus(403);
    }
}

