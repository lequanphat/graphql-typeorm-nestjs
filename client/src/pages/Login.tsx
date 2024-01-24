import { useMutation } from '@apollo/client';
import { Button, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { CREATE_GOOGLE_USER_MUTATION } from '../graphql/mutation';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [createGoogleUser] = useMutation(CREATE_GOOGLE_USER_MUTATION);
  const handleLoginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    await createGoogleUser({
      variables: {
        createUserData: {
          email: response.user.email,
          displayName: response.user.displayName,
          avatar: response.user.photoURL,
          type: 'google',
        },
      },
    });
    navigate('/users');
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
