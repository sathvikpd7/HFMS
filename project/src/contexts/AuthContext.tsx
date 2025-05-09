import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, roomNumber: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock login API call - would be replaced with actual API call to Flask backend
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === 'password') {
        const adminUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          roomNumber: 'ADMIN',
          role: 'admin'
        };
        
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
      } else if (email === 'student@example.com' && password === 'password') {
        const studentUser: User = {
          id: '2',
          name: 'Student User',
          email: 'student@example.com',
          roomNumber: 'A-101',
          role: 'student'
        };
        
        setUser(studentUser);
        localStorage.setItem('user', JSON.stringify(studentUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, roomNumber: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock register API call - would be replaced with actual API call to Flask backend
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        roomNumber,
        role: 'student'
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};