<?php

namespace Tests\Unit;

use App\Http\Requests\UpdatePublicShareRequest;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class UpdatePublicShareRequestTest extends TestCase
{
    public function test_access_key_needs_at_least_8_characters(): void
    {
        $rules = (new UpdatePublicShareRequest())->rules();

        $this->assertTrue(Validator::make(['access_key' => 'abc1234'], $rules)->fails());
        $this->assertFalse(Validator::make(['access_key' => 'abcd1234'], $rules)->fails());
        $this->assertTrue(Validator::make(['access_key' => str_repeat('a', 65)], $rules)->fails());
    }
}
