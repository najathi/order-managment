'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { __APP_NAME__ } from '@/lib/constants';

interface LoginFormProps {

}

const LoginForm: React.FC<LoginFormProps> = ({ }) => {
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();

    router.push('/dashboard');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Log In</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
          <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot Your Password?</Link>
        </div>
        <div className="mb-6">
          <button className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
            Log In
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or</a>
          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>
        <div className="mt-6">
          <button className="bg-white text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 shadow-sm hover:shadow-lg w-full" type="button">
            Log in with Google
          </button>
        </div>
      </form>
      <p className="text-xs text-center text-gray-500 mt-6">
        By logging in, you agree to accept our <Link href="#" className="text-blue-500 hover:text-blue-800">Privacy Notice</Link>.
        This site is protected by reCAPTCHA and the Google <Link href="#" className="text-blue-500 hover:text-blue-800">Privacy Policy</Link> and <Link href="#" className="text-blue-500 hover:text-blue-800">Terms of Service</Link> apply.
      </p>
      <p className="text-xs text-center text-gray-500 mt-4">
        New to {__APP_NAME__}? <Link href="/register" className="text-blue-500 hover:text-blue-800">Get started</Link>
      </p>
    </div>
  );
}

export default LoginForm;