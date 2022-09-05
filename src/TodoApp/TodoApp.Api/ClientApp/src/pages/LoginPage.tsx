import { useEffect } from 'react';
import { LoginForm } from '../views';

export const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  return <LoginForm />;
};
