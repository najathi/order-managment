import { Layout, Menu } from 'antd';
import {
  DesktopOutlined, PieChartOutlined, UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

type SideBarProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <PieChartOutlined />),
  getItem('Orders', '/orders', <DesktopOutlined />),
  getItem('Products', '/products', <UserOutlined />),
];

const SideBar: React.FC<SideBarProps> = ({ collapsed, setCollapsed }) => {
  const router = useRouter();

  const onMenuClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      collapsedWidth={collapsed ? 80 : 200}
      className="bg-gray-800"
    >
      <Logo />
      <Menu
        theme="dark"
        defaultSelectedKeys={['/dashboard']}
        mode="inline"
        items={items}
        onClick={onMenuClick}
      />
    </Sider>
  );
};

const Logo: React.FC = () => (
  <div className="flex justify-center items-center p-4 bg-white mx-auto my-6">
    <Image
      src="/next.svg"
      alt="Logo"
      width={40}
      height={40}
    />
  </div>
);

export default SideBar;