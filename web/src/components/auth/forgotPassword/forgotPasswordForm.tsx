'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react'

interface ForgotPasswordProps {

}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would handle the password reset logic, like sending an email to the user
    console.log('Password reset email sent to:', email);

    router.push('/reset-password');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            Enter your email address and we will send you a link to reset your password.
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;