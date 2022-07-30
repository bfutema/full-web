import { useContext } from 'react';

import { IToastContext, ToastContext } from '@contexts/ReactToastContext';

function useToast(): IToastContext {
  const context = useContext(ToastContext);

  return context;
}

export { useToast };
