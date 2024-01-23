import { ReactElement, createContext, useEffect, useState } from 'react';
import { getAuth, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({ user: undefined, setUser: {} });

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<User>();

  const auth = getAuth();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubribed = auth.onIdTokenChanged((user: any) => {
      console.log('auth provider', { user });
      if (user?.uid) {
        setUser(user);
        localStorage.setItem('accessToken', user?.accessToken);
        return;
      }
      setUser(undefined);
      localStorage.clear();
      navigate('/auth/login');
    });
    return () => {
      unsubribed();
    };
  });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
