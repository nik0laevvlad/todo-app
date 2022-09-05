import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Error404Page } from './Error404Page';
import { MainPage } from './MainPage';
import { RegistrationPage } from './RegistrationPage';
import { LoginPage } from './LoginPage';
import { WhoPage } from './WhoPage';

export const Pages = () => {
  return (
    <Routes>
      <Route path="/todo-app" element={<MainPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/who" element={<WhoPage />} />

      <Route path="*" element={<Error404Page />} />
      <Route path="/" element={<Navigate to="/todo-app" />} />
    </Routes>
  );
};
