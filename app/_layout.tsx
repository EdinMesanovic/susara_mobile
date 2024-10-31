import React from 'react';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import LoginScreen from './screens/login';
import MainTabs from './tabs/MainTabs';

const Layout = ({ children }: any) => {
  return (
    <AuthProvider>
      <AuthCheck>{children}</AuthCheck>
    </AuthProvider>
  );
};

const AuthCheck = ({ children }: any) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <MainTabs /> : <LoginScreen />;
};

export default Layout;
