import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Image from 'next/image'; // Next.js optimized Image component

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
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

const SideBar: React.FC<SideBarProps> = ({ collapsed, setCollapsed }) => {
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
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
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