import React, { useMemo, useState, useCallback } from 'react';

import { ThemeProvider as StyledProvider } from 'styled-components';
import { createContext } from 'use-context-selector';

import { colors } from '@components/bosons/colors';

import { themes } from '../styles/themes';

interface IThemeContext {
  theme: 'light' | 'dark';
  colors: typeof colors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

interface IThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(
    () => setTheme(state => (state === 'light' ? 'dark' : 'light')),
    [],
  );

  const value: IThemeContext = useMemo(() => {
    return { theme, toggleTheme, colors };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <StyledProvider theme={themes[theme]}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
