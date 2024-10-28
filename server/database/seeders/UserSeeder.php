<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        $this->createUserIfNotExists(
            'Najathi',
            'najathi@example.com',
            'abcd1234'
        );
    }

    /**
     * Create a user if the email does not already exist.
     */
    private function createUserIfNotExists($name, $email, $password)
    {
        if (!User::where('email', $email)->exists()) {
            User::factory()->create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password), // Secure password
            ]);

            echo "User with email {$email} created successfully.\n";
        } else {
            echo "User with email {$email} already exists.\n";
        }
    }
}
