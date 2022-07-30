import React, { useMemo, useState, useEffect, useCallback } from 'react';

import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { AUTH_COOKIE_REFRESH_TOKEN, AUTH_COOKIE_TOKEN } from '@constants/auth';
import { ILoginRequest } from '@interfaces/e2e/requests/IAuthRequest';
import { AuthService } from '@services/apis/AuthService';

export interface IAuthContext {
  signed: boolean;
  signIn: (formData: ILoginRequest) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

let authChannel: BroadcastChannel;

async function logout() {
  destroyCookie(undefined, AUTH_COOKIE_TOKEN);
  destroyCookie(undefined, AUTH_COOKIE_REFRESH_TOKEN);

  await AuthService.logout();

  window.location.href = '/sign-in';
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [signed, setSigned] = useState<boolean>(() => {
    const { 'full.token': token } = parseCookies();

    if (token) return true;

    return false;
  });

  const signIn = useCallback(async (formData: ILoginRequest) => {
    const { token, refresh_token } = await AuthService.login(formData);

    setCookie(undefined, AUTH_COOKIE_TOKEN, token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    setCookie(undefined, AUTH_COOKIE_REFRESH_TOKEN, refresh_token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    setSigned(true);
  }, []);

  const signOut = useCallback(async () => {
    new BroadcastChannel('full.auth').postMessage('full.signOut');
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel('full.auth');

    authChannel.onmessage = message => {
      switch (message.data) {
        case 'full.signOut':
          logout();
          break;
        default:
          break;
      }
    };
  }, []);

  const value: IAuthContext = useMemo(() => {
    return { signed, signIn, signOut };
  }, [signed, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
