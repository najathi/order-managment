'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Typography, message } from 'antd';
import { signIn } from 'next-auth/react';

import { __APP_NAME__ } from '@/lib/constants';

type LoginFormProps = object;

const { Title, Text, Link: AntLink, Paragraph } = Typography;

const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();

  const handleLogin = async (values: any) => {
    const { email, password } = values;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error('Login failed:', result.error);
      let errorMessage = 'Login failed';
      if (result.error === 'Invalid credentials') {
        errorMessage = 'Invalid email or password';
      }
      message.error(errorMessage);

    } else {
      router.push('/orders');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <Title level={2} className="text-center">Log In</Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Forgot Your Password?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Log In
          </Button>
        </Form.Item>
      </Form>

      <div className="flex items-center justify-between">
        <Text className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></Text>
        <Text className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">or</Text>
        <Text className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></Text>
      </div>

      <div className="my-6">
        <Button className="w-full" type="default">
          Log in with Google
        </Button>
      </div>

      <Paragraph className="text-xs text-center text-gray-500 mt-6">
        By logging in, you agree to accept our <AntLink href="#" className="text-blue-500 hover:text-blue-800">Privacy Notice</AntLink>.
        This site is protected by reCAPTCHA and the Google <AntLink href="#" className="text-blue-500 hover:text-blue-800">Privacy Policy</AntLink> and <AntLink href="#" className="text-blue-500 hover:text-blue-800">Terms of Service</AntLink> apply.
      </Paragraph>
      <Paragraph className="text-xs text-center text-gray-500 mt-4">
        New to {__APP_NAME__}? <AntLink href="/register" className="text-blue-500 hover:text-blue-800">Get started</AntLink>
      </Paragraph>
    </div>
  );
}

export default LoginForm;