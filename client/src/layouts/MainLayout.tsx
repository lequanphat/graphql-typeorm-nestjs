import React, { useContext } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Flex, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { AuthContext } from '../context/AuthProvider';
import { getAuth } from 'firebase/auth';

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
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!user) {
    navigate('/auth/login');
    return;
  }
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
  const handleLogout = () => {
    auth.signOut();
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
        <Flex
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh',
            padding: '20px 8px',
          }}
        >
          <Flex
            style={{
              flexDirection: 'column',
            }}
          >
            <Title level={3} style={{ color: 'white', paddingLeft: '20px' }}>
              LOGO
            </Title>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={items}
              onSelect={handleNavbar}
            />
          </Flex>
          <Flex style={{ alignItems: 'center' }}>
            <Avatar src={user?.photoURL} />
            <Title level={5} style={{ color: 'white', margin: '0 5px 0 5px' }}>
              {user?.displayName}
            </Title>
            <Button onClick={handleLogout}>out</Button>
          </Flex>
        </Flex>
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
