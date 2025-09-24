// auth-context.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@shared/schema';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      fetchUserData(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async (userToken: string) => {
    try {
      const response = await fetch('http://localhost:5008/api/auth/me', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        setToken(userToken);
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    // Optional: Call logout endpoint
    fetch('http://localhost:5008/api/auth/logout', { method: 'POST' });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}