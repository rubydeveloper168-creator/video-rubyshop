<?php

namespace App\Console\Commands;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create 
                            {--name= : The name of the admin user}
                            {--email= : The email of the admin user}
                            {--password= : The password of the admin user}
                            {--force : Force create without confirmation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Creating a new admin user...');

        // Get user input
        $name = $this->option('name') ?? $this->ask('What is the admin\'s name?');
        $email = $this->option('email') ?? $this->ask('What is the admin\'s email?');
        $password = $this->option('password') ?? $this->secret('What is the admin\'s password?');

        // Validate input
        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            $this->error('Validation failed:');
            foreach ($validator->errors()->all() as $error) {
                $this->error('- ' . $error);
            }
            return 1;
        }

        // Check if user already exists
        if (User::where('email', $email)->exists()) {
            $this->error('A user with this email already exists!');
            
            if (!$this->option('force') && !$this->confirm('Do you want to update the existing user?')) {
                $this->info('Operation cancelled.');
                return 1;
            }
            
            // Update existing user
            $user = User::where('email', $email)->first();
            $user->update([
                'name' => $name,
                'password' => Hash::make($password),
                'role' => UserType::ADMIN->value,
                'status' => 1,
                'email_verified_at' => now(),
            ]);
            
            $this->info("Admin user '{$name}' updated successfully!");
        } else {
            // Create new user
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => UserType::ADMIN->value,
                'status' => 1,
                'email_verified_at' => now(),
            ]);
            
            $this->info("Admin user '{$name}' created successfully!");
        }

        // Display user details
        $this->table(
            ['Field', 'Value'],
            [
                ['Name', $user->name],
                ['Email', $user->email],
                ['Role', $user->role],
                ['Status', $user->status ? 'Active' : 'Inactive'],
                ['Email Verified', $user->email_verified_at ? 'Yes' : 'No'],
            ]
        );

        return 0;
    }
}
