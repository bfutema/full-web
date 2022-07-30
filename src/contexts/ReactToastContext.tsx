import React, { useMemo, useState, useCallback } from 'react';

import { v4 } from 'uuid';

import { Toasts } from '@components/molecules';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastMessage = {
  id: string;
  type?: ToastType;
  title: string;
};

export interface IToastContext {
  addToast: (message: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<IToastContext>({} as IToastContext);

interface IToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider: React.FC<IToastProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ title, type }: Omit<ToastMessage, 'id'>) => {
    setMessages(prevMessages => [...prevMessages, { id: v4(), title, type }]);
  }, []);

  const removeToast = useCallback((_id: string) => {
    setMessages(prevMessages => prevMessages.filter(({ id }) => id !== _id));
  }, []);

  const value: IToastContext = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Toasts messages={messages} setMessages={setMessages} />
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
