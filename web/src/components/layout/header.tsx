import React from 'react'
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const items1: MenuProps['items'] = [
  {
    label: 'Site 1',
    key: 's1-1',
    children: [
      {
        label: 'Order',
        key: 's1-2',
      },
      {
        label: 'Order 2',
        key: 's1-3',
      },
    ],
  },
  {
    label: 'Site 2',
    key: 's1-4',
  },
  {
    label: 'Site 3',
    key: '5',
  },
];

const items2: MenuProps['items'] = [
  {
    label: <><UserOutlined /> Profile</>,
    key: 's2-1',
    children: [
      {
        label: 'Settings',
        key: 's2-2',
      },
      {
        label: 'My Account',
        key: 's2-3',
      },
      {
        label: 'Logout',
        key: 's2-4',
      },
    ]
  },
];

interface HeaderCmpProps {

}

const HeaderCmp: React.FC<HeaderCmpProps> = ({ }) => {
  return (
    <Header
      className='flex items-center justify-between'
    >
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={items1}
        className='min-w-0 flex-1'
      />
      <Menu
        theme="dark"
        mode="horizontal"
        items={items2}
      />
    </Header>
  );
}

export default HeaderCmp;