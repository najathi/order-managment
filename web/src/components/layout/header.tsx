import { useCallback, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

import api from '@/api';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
};

type HeaderCmpProps = object;

const HeaderCmp: React.FC<HeaderCmpProps> = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session } = useSession();

  const handleLogout = useCallback(async () => {
    if (!session)
      router.push('/');

    try {
      await api.post('/auth/logout');
    } catch (error: any) {
      console.error('Failed to logout:', error);
    } finally {
      await signOut({
        callbackUrl: '/',
        redirect: true,
      });
      router.push('/');
    }
  }, [router, session]);

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
          { label: session ? 'Logout' : 'Login', key: '/logout', onClick: handleLogout },
        ],
      },
    ],
    [handleLogout, session]
  );

  const onClick: MenuProps['onClick'] = useCallback(
    (e: { key: string; }) => {
      router.push(e.key);
    },
    [router]
  );

  return (
    <Header
      className="flex items-center justify-between"
      style={headerStyle}
    >
      <Logo />
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

const Logo: React.FC = () => (
  <div className="flex justify-center items-center p-4 bg-white mx-auto mr-4">
    <Image
      src="/next.svg"
      alt="Logo"
      width={40}
      height={40}
    />
  </div>
);

export default HeaderCmp;
