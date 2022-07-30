import { useContext } from 'react';

import { AuthContext, IAuthContext } from '@contexts/ReactAuthContext';

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth };
