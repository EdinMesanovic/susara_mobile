import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth mora biti korišten unutar AuthProvider-a");
  return context;
};
