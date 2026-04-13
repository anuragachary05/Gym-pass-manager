import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  // Mock login for demo purposes
  mockLogin: (role: 'user' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Mock method to let user preview without Firebase keys
  const mockLogin = (role: 'user' | 'admin') => {
    setCurrentUser({ uid: role === 'admin' ? 'admin-123' : 'user-456', email: `${role}@example.com` } as User);
    setIsAdmin(role === 'admin');
  };

  const signOut = async () => {
    if (auth.app.options.apiKey === "YOUR_API_KEY") {
      setCurrentUser(null);
      setIsAdmin(false);
    } else {
      await firebaseSignOut(auth);
    }
  };

  useEffect(() => {
    if (auth.app.options.apiKey === "YOUR_API_KEY") {
      // If config is not set, finish loading
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Rough mock admin check for real firebase usage
      setIsAdmin(user?.email?.includes('admin') || false);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    isAdmin,
    signOut,
    mockLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
