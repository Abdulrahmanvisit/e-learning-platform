/**
 * LearnPath Authentication & Role Context
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole } from '../types/index.ts';
import { api } from '../api/client.ts';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  availableAccounts: UserProfile[];
  loading: boolean;
  switchAccount: (userId: string) => Promise<void>;
  login: (email: string) => Promise<void>;
  register: (email: string, fullName: string, role?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [availableAccounts, setAvailableAccounts] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const res = await api.getMe();
      setUser(res.user);
      setAvailableAccounts(res.availableAccounts);
    } catch (err) {
      console.error('Failed to load user session', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const switchAccount = async (userId: string) => {
    try {
      const res = await api.switchAccount(userId);
      setUser(res.user);
    } catch (err) {
      console.error('Failed to switch profile', err);
    }
  };

  const login = async (email: string) => {
    const res = await api.login(email);
    setUser(res.user);
    await fetchSession();
  };

  const register = async (email: string, fullName: string, role = 'learner') => {
    const res = await api.register({ email, fullName, role });
    setUser(res.user);
    await fetchSession();
  };

  const logout = () => {
    // Return to default learner profile
    const defaultLearner = availableAccounts.find((a) => a.role === 'learner');
    if (defaultLearner) {
      switchAccount(defaultLearner.id);
    }
  };

  const refreshUser = async () => {
    await fetchSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'learner',
        availableAccounts,
        loading,
        switchAccount,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
