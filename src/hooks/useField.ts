import { useCallback, useContext, useEffect, useMemo } from 'react';

import dot from 'dot-object';

import { FormContext, IFormContext } from '@contexts/ReactFormContext';

function useField(name: string) {
  const {
    initialData,
    errors,
    scopePath,
    unregisterField,
    registerField,
    clearFieldError,
    formRef,
  } = useContext<IFormContext>(FormContext);

  if (!name) {
    throw new Error('You need to provide the "name" prop.');
  }

  const fieldName = useMemo(() => {
    return scopePath ? `${scopePath}.${name}` : name;
  }, [name, scopePath]);

  const defaultValue = useMemo(() => {
    return dot.pick(fieldName, initialData);
  }, [fieldName, initialData]);

  const error = useMemo(() => {
    return errors[fieldName];
  }, [errors, fieldName]);

  const clearError = useCallback(() => {
    clearFieldError(fieldName);
  }, [clearFieldError, fieldName]);

  useEffect(
    () => () => unregisterField(fieldName),
    [fieldName, unregisterField],
  );

  return {
    fieldName,
    registerField,
    defaultValue,
    clearError,
    error,
    formRef,
  };
}

export { useField };
