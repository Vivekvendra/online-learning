import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { storage } from '../utils/storage';
import { DEMO_USERS } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize registered users from storage or defaults
  const [users, setUsers] = useState(() => {
    const saved = storage.get('lms_users');
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    storage.set('lms_users', DEMO_USERS);
    return DEMO_USERS;
  });

  // Current active user session
  const [user, setUser] = useState(() => {
    return storage.get('lms_auth_user', null);
  });

  const [loading, setLoading] = useState(false);

  // Sync users list to storage
  useEffect(() => {
    storage.set('lms_users', users);
  }, [users]);

  // Sync current user to storage
  useEffect(() => {
    if (user) {
      storage.set('lms_auth_user', user);
    } else {
      storage.remove('lms_auth_user');
    }
  }, [user]);

  // Login handler
  const login = async (email, password, rememberMe = true) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600)); // simulated async delay

    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (existing) {
      const authUser = {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        role: existing.role,
        avatar: existing.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        title: existing.title || 'Student Member',
        loginTime: new Date().toISOString()
      };
      setUser(authUser);
      if (rememberMe) {
        storage.set('lms_auth_user', authUser);
      }
      setLoading(false);
      toast.success(`Welcome back, ${authUser.name}!`);
      return { success: true, user: authUser };
    }

    setLoading(false);
    toast.error('Invalid email or password. Please try again.');
    return { success: false, message: 'Invalid email or password' };
  };

  // Register handler
  const register = async (userData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const normalizedEmail = userData.email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      setLoading(false);
      toast.error('An account with this email already exists.');
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name.trim(),
      email: normalizedEmail,
      password: userData.password,
      role: userData.role || 'Student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
      title: userData.role === 'Instructor' ? 'Certified Instructor' : 'Active Student',
      joinedDate: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    storage.set('lms_users', updatedUsers);

    const authUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      title: newUser.title,
      loginTime: new Date().toISOString()
    };
    setUser(authUser);
    storage.set('lms_auth_user', authUser);

    setLoading(false);
    toast.success('Registration successful! Welcome to Stackly LMS.');
    return { success: true, user: authUser };
  };

  // Forgot password handler
  const forgotPassword = async (email) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const normalizedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    setLoading(false);
    if (existing) {
      toast.success(`Password reset link has been dispatched to ${normalizedEmail}.`);
      return { success: true };
    }

    // For security reasons, don't expose if email doesn't exist, but inform user
    toast.info('If that email exists in our system, a reset link was sent.');
    return { success: true };
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    storage.remove('lms_auth_user');
    toast.info('You have been logged out.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        forgotPassword,
        logout,
        demoUsers: DEMO_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
