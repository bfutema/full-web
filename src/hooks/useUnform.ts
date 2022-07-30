import { IField, IFormHandles } from '@contexts/ReactFormContext';
import { useField } from '@hooks/useField';

export interface IUseUnformReturn {
  fieldName: string;
  registerField: <T>(field: IField<T>) => void;
  defaultValue: any;
  clearError: () => void;
  error: string | undefined;
  formRef: React.RefObject<IFormHandles>;
}

function useUnform(inputName: string): IUseUnformReturn | undefined {
  try {
    const unformResponse = useField(inputName);

    return unformResponse;
  } catch (err) {
    return undefined;
  }
}

export { useUnform };
