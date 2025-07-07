import React, { createContext, useContext, ReactNode } from 'react';
import { AuthContext as ExpoAuthContext } from '../app/_layout';

export const useAuth = () => {
  const context = useContext(ExpoAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 