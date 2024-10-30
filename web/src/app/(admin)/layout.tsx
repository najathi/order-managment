'use client';

import { useState } from 'react';
import { Layout, theme } from 'antd';

import HeaderCmp from '@/components/layout/header';
import SideBar from '@/components/layout/sideBar';
import FooterCmp from '@/components/layout/footer';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const { Content, Sider } = Layout;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderCmp />

      <Layout hasSider>
        <Sider width={collapsed ? 80 : 200}>
          <SideBar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </Sider>

        <Layout>
          <Content className="px-4" style={{ padding: '16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
          <FooterCmp />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
