import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './ReactAuthContext';
import { ThemeProvider } from './ReactThemeContext';
import { ToastProvider } from './ReactToastContext';

interface IAppProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export { AppProvider };
