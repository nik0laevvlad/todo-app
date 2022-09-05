import { RegistrationForm } from '../views';
import { useEffect } from 'react';

export const RegistrationPage = () => {
  useEffect(() => {
    document.title = 'Registration';
  }, []);

  return <RegistrationForm />;
};
