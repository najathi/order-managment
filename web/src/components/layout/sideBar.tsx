import { Layout, Menu } from 'antd';
import {
  DesktopOutlined, PieChartOutlined, UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

type SideBarProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 64,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
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
      style={siderStyle}
    >
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

export default SideBar;