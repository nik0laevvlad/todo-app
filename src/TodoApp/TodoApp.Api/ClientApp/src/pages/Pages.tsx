import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Error404Page } from './Error404Page';
import { MainPage } from './MainPage';
import { RegistrationPage } from './RegistrationPage';
import { LoginPage } from './LoginPage';
import { WhoPage } from './WhoPage';

interface pageTitle {
  link: string;
  title: string;
}

const titles: pageTitle[] = [
  { link: '/todo-app', title: 'Main page' },
  { link: '/register', title: 'Registration' },
  { link: '/login', title: 'Login' },
  { link: '/who-am-i', title: 'Test page' },
];

export const Pages = () => {
  useEffect(() => {
    const value = titles.find((x) => x.link === document.location.pathname);
    document.title = value === undefined ? '404' : value!.title;
  }, []);

  return (
    <Routes>
      <Route path="/todo-app" element={<MainPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/who-am-i" element={<WhoPage />} />

      <Route path="*" element={<Error404Page />} />
      <Route path="/" element={<Navigate to="/todo-app" />} />
    </Routes>
  );
};
