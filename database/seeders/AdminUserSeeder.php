<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin user
        User::updateOrCreate(
            ['email' => 'admin@mentorlms.com'],
            [
                'name' => 'Admin User',
                'email' => 'admin@mentorlms.com',
                'password' => Hash::make('11223344'),
                'role' => UserType::ADMIN->value,
                'status' => 1,
                'email_verified_at' => now(),
            ]
        );

        // You can create additional admin users here
        User::updateOrCreate(
            ['email' => 'superadmin@mentorlms.com'],
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@mentorlms.com',
                'password' => Hash::make('11223344'),
                'role' => UserType::ADMIN->value,
                'status' => 1,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Admin users created successfully!');
    }
}
