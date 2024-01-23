import { Button, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const Login = () => {
  const handleLoginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  return (
    <Flex style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Title>Welcome to GraphQL</Title>
      <Button type="primary" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </Flex>
  );
};
export default Login;
