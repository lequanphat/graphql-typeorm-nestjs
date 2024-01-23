import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: React.createElement(UserOutlined),
    label: 'Users',
  },
  {
    key: '2',
    icon: React.createElement(UploadOutlined),
    label: '2',
  },
  {
    key: '3',
    icon: React.createElement(VideoCameraOutlined),
    label: '3',
  },
];

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // handle
  const handleNavbar = ({ key }: { key: string }) => {
    switch (key) {
      case '1':
        navigate('/users');
        break;
      case '2':
        navigate('/app');
        break;
      default:
        break;
    }
  };
  // render
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Title level={3} style={{ color: 'white', padding: '0 20px' }}>
          LOGO
        </Title>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onSelect={handleNavbar}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
