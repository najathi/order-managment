'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Typography, message } from 'antd';

import api from '@/api';

const { Title, Paragraph } = Typography;

type RegisterFormProps = object;

const RegisterForm: React.FC<RegisterFormProps> = ({ }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleRegister = async (values: any) => {
    const { name, email, password } = values;

    if (password !== values.confirmPassword) {
      form.setFields([
        {
          name: 'confirmPassword',
          errors: ['Passwords do not match'],
        },
      ]);
      return;
    }

    const response = await api.post('/auth/register', {
      name,
      email,
      password
    });

    if (response.status === 201) {
      router.push('/dashboard');
      message.success('Account created successfully');
    }

    if (response.status === 400) {
      message.error('Failed to create account');
    }

  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <Title level={4} className="text-center pb-4">Create an Account</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleRegister}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>

      <Paragraph className="text-center">
        Already have an account? <Link href="/" className="text-blue-500 hover:text-blue-800">Login</Link>.
      </Paragraph>
    </div>
  );
}

export default RegisterForm;