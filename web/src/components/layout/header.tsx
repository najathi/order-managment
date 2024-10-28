import React, { useCallback, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

import api from '@/api';

const { Header } = Layout;

type HeaderCmpProps = object;

const HeaderCmp: React.FC<HeaderCmpProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = useCallback(async () => {
    await api.post('/auth/logout');

    const res = await signOut({
      callbackUrl: '/',
      redirect: true,
    });

    console.log(res);

    router.push('/');
  }, [router]);

  const items1: MenuProps['items'] = useMemo(
    () => [
      { label: 'Dashboard', key: '/dashboard' },
      { label: 'Orders', key: '/orders' },
      { label: 'Products', key: '/products' },
    ],
    []
  );

  const items2: MenuProps['items'] = useMemo(
    () => [
      {
        label: (
          <>
            <UserOutlined /> Profile
          </>
        ),
        key: 's2-1',
        children: [
          { label: 'Settings', key: '/settings' },
          { label: 'My Account', key: '/account' },
          { label: 'Logout', key: '/logout', onClick: handleLogout },
        ],
      },
    ],
    [handleLogout]
  );

  const onClick: MenuProps['onClick'] = useCallback(
    (e: { key: string; }) => {
      router.push(e.key);
    },
    [router]
  );

  return (
    <Header className="flex items-center justify-between">
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={items1}
        className="min-w-0 flex-1"
        onClick={onClick}
      />
      <Menu theme="dark" mode="horizontal" items={items2} />
    </Header>
  );
};

export default HeaderCmp;
