import { appwriteGetUser, appwriteLogout } from '@/services/appwriteAuth';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  email: string;
  name?: string;
  id?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    await appwriteLogout();
    setUser(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await appwriteGetUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
