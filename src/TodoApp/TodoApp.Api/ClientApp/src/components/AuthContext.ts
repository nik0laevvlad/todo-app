import { createContext } from 'react';
import { UserContextDto } from '../types';

export const AuthContext = createContext<UserContextDto>({
  id: undefined,
  isAuthenticated: false,
});
