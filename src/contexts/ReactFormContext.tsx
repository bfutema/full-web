/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useImperativeHandle,
} from 'react';

import dot from 'dot-object';

export interface IFormRef extends Partial<IFormHandles> {
  submit?: () => void;
}

interface IBaseField<T> {
  name: string;
  ref?: any;
  setValue?: (ref: any, value: T) => void;
  clearValue?: (ref: any, newValue: T) => void;
}

interface IPathField<T> extends IBaseField<T> {
  path: string;
  getValue?: undefined;
}

interface IFunctionField<T> extends IBaseField<T> {
  path?: undefined;
  getValue: (ref: any) => T;
}

export type IField<T = any> = IPathField<T> | IFunctionField<T>;

type IErrors = { [key: string]: string | undefined };

type HTMLFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export interface IFormContext {
  formRef: React.RefObject<IFormHandles>;
  initialData: Record<string, any>;
  errors: IErrors;
  scopePath: string;
  registerField<T>(field: IField<T>): void;
  unregisterField: (name: string) => void;
  clearFieldError: (fieldName: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
}

const FormContext = React.createContext<IFormContext>({} as IFormContext);

export interface IFormHandles {
  getFieldValue(fieldName: string): any;
  setFieldValue(fieldName: string, value: any): void | boolean;
  getFieldError(fieldName: string): string | undefined;
  setFieldError(fieldName: string, error: string): void;
  clearField(fieldName: string): void;
  getData(): Record<string, any>;
  getFieldRef(fieldName: string): any;
  setData(data: Record<string, any>): void;
  getErrors(): IErrors;
  setErrors(errors: Record<string, string>): void;
  reset(data?: Record<string, any>): void;
  submitForm(): void;
}

interface IFormHelpers {
  reset: (data?: Record<string, any>) => void;
}

interface ISubmitHandler<T = any> {
  (data: T, helpers: IFormHelpers, event?: React.FormEvent): void;
}

export interface IFormProps extends Omit<HTMLFormProps, 'onSubmit'> {
  initialData?: Record<string, any>;
  children: React.ReactNode;
  onSubmit: ISubmitHandler;
}

const FormProvider: React.ForwardRefRenderFunction<IFormHandles, IFormProps> = (
  { initialData = {}, children, onSubmit },
  formRef,
) => {
  const [errors, setErrors] = useState<IErrors>({});

  const fields = useRef<IField[]>([]);

  const getFieldByName = useCallback((fieldName: string) => {
    return fields.current.find(field => field.name === fieldName);
  }, []);

  const getFieldValue = useCallback(({ ref, getValue, path }: IField) => {
    if (getValue) return getValue(ref);

    return path && dot.pick(path, ref);
  }, []);

  const setFieldValue = useCallback(
    ({ path, ref, setValue }: IField, value: any) => {
      if (setValue) setValue(ref, value);

      return path ? dot.set(path, value, ref as object) : false;
    },
    [],
  );

  const clearFieldValue = useCallback(({ clearValue, ref, path }: IField) => {
    if (clearValue) clearValue(ref, '');

    return path && dot.set(path, '', ref as object);
  }, []);

  const reset = useCallback((data: any = {}) => {
    fields.current.forEach(({ name, ref, path, clearValue }) => {
      if (clearValue) clearValue(ref, data[name]);

      ref.value = '';

      setErrors({});

      if (path?.includes('dataset')) return false;

      return path && dot.set(path, data[name] ? data[name] : '', ref as object);
    });
  }, []);

  const setData = useCallback(
    (data: object) => {
      const fieldValue: any = {};

      fields.current.forEach(field => {
        fieldValue[field.name] = dot.pick(field.name, data);
      });

      Object.entries(fieldValue).forEach(([fieldName, value]) => {
        const field = getFieldByName(fieldName);

        if (field) setFieldValue(field, value);
      });
    },
    [getFieldByName, setFieldValue],
  );

  const setFormErrors = useCallback((formErrors: object) => {
    const parsedErrors = dot.dot(formErrors);

    setErrors(parsedErrors);
  }, []);

  const parseFormData = useCallback(() => {
    const data: any = {};

    fields.current.forEach(field => {
      data[field.name] = getFieldValue(field);
    });

    dot.object(data);

    return data;
  }, [getFieldValue]);

  const handleSubmit = useCallback(
    async (event?: React.FormEvent) => {
      if (event) event.preventDefault();

      const data = parseFormData();

      onSubmit(data, { reset }, event);
    },
    [onSubmit, parseFormData, reset],
  );

  const registerField = useCallback((field: IField) => {
    const foundedFieldIndex = fields.current.findIndex(
      item => item.name === field.name,
    );

    if (foundedFieldIndex <= 0) fields.current.push(field);
    else fields.current[foundedFieldIndex] = field;
  }, []);

  const unregisterField = useCallback((fieldName: string) => {
    const findIndex = fields.current.findIndex(
      field => field.name === fieldName,
    );

    if (findIndex > -1) fields.current.splice(findIndex, 1);
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(state => ({ ...state, [fieldName]: undefined }));
  }, []);

  useImperativeHandle<{}, IFormHandles>(formRef, () => ({
    getFieldValue(fieldName) {
      const field = getFieldByName(fieldName);

      if (!field) return false;

      return getFieldValue(field);
    },
    setFieldValue(fieldName, value) {
      const field = getFieldByName(fieldName);

      if (!field) return false;

      return setFieldValue(field, value);
    },
    getFieldError(fieldName) {
      return errors[fieldName];
    },
    setFieldError(fieldName, error) {
      setErrors(state => ({ ...state, [fieldName]: error }));
    },
    clearField(fieldName) {
      const field = getFieldByName(fieldName);

      if (field) clearFieldValue(field);
    },
    getErrors() {
      return errors;
    },
    setErrors(formErrors) {
      return setFormErrors(formErrors);
    },
    getData() {
      return parseFormData();
    },
    getFieldRef(fieldName) {
      const field = getFieldByName(fieldName);

      if (!field) return false;

      return field.ref;
    },
    setData(data) {
      return setData(data);
    },
    reset(data) {
      return reset(data);
    },
    submitForm() {
      handleSubmit();
    },
  }));

  const parsedFormRef = formRef as React.RefObject<IFormHandles>;

  return (
    <FormContext.Provider
      value={{
        initialData,
        errors,
        scopePath: '',
        registerField,
        unregisterField,
        clearFieldError,
        handleSubmit,
        formRef: parsedFormRef,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const Provider = React.forwardRef(FormProvider);

const Form: React.ForwardRefRenderFunction<IFormHandles, IFormProps> = (
  { initialData = {}, children, onSubmit, ...rest },
  formRef,
) => {
  return (
    <Provider ref={formRef} initialData={initialData} onSubmit={onSubmit}>
      <FormContext.Consumer>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} {...rest}>
            {children}
          </form>
        )}
      </FormContext.Consumer>
    </Provider>
  );
};

interface IScopeProps {
  path: string;
  children: React.ReactNode;
}

function Scope({ path, children }: IScopeProps) {
  const { scopePath, ...form } = useContext(FormContext);

  return (
    <FormContext.Provider
      value={{
        ...form,
        scopePath: scopePath.concat(scopePath ? `.${path}` : path),
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

const Component = React.forwardRef(Form);

export { FormContext, FormProvider, Component as Form, Scope };
