import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  organization?: string;
  phone?: string;
  avatar?: string; // Add optional avatar property
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (userData: Omit<User, 'id'>) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Key for storing users in localStorage
const USERS_STORAGE_KEY = 'registered_users';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize users in localStorage if not exists
  useEffect(() => {
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    }
    
    // Check for logged in user
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
        localStorage.removeItem('current_user');
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get all registered users
      const users = getUsers();
      
      // Check if email exists
      const user = users.find((u: User) => u.email === email);
      
      if (!user) {
        return { 
          success: false, 
          message: 'This email is not registered. Please register first.'
        };
      }
      
      // Check password
      if (user.password !== password) {
        return { 
          success: false, 
          message: 'Invalid password. Please try again.'
        };
      }

      setUser(user);
      localStorage.setItem('current_user', JSON.stringify(user));
      
      return { success: true, message: 'Login successful' };
    } catch (err) {
      console.error('Login error:', err);
      return { 
        success: false, 
        message: 'An error occurred during login. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<User, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getUsers();
      
      // Check if user already exists
      const userExists = users.some((u: User) => u.email === userData.email);
      if (userExists) {
        return { 
          success: false, 
          message: 'Email already registered. Please log in instead.' 
        };
      }
      
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
      };
      
      // Save new user to registered users
      const updatedUsers = [...users, newUser];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      
      // Log the user in
      setUser(newUser);
      localStorage.setItem('current_user', JSON.stringify(newUser));
      
      return { 
        success: true, 
        message: 'Registration successful! You are now logged in.' 
      };
    } catch (err) {
      console.error('Registration error:', err);
      return { 
        success: false, 
        message: 'An error occurred during registration. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
