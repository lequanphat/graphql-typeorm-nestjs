import { Flex } from 'antd';
import { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export const EmptyLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (user) {
    navigate('/users');
    return;
  }
  return (
    <Flex
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Outlet />
    </Flex>
  );
};
