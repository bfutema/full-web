import React, { useRef, useMemo, useEffect } from 'react';
import { IconBaseProps } from 'react-icons';

import { ErrorContainer } from '@components/quarks/Input/ErrorContainer';
import { IconContainer } from '@components/quarks/Input/IconContainer';
import { LabelContainer } from '@components/quarks/Input/LabelContainer';
import { InputHelper } from '@helpers/InputHelper';
import { useFieldFeedback } from '@hooks/useFieldFeedback';
import { useUnform } from '@hooks/useUnform';
import { IMask } from '@interfaces/components/IInput';

import { Container } from './styles';

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  mask?: IMask;
  icon?: React.ComponentType<IconBaseProps>;
  defaultValue?: any;
  errorMessage?: string;
}

const Input: React.FC<IInputProps> = ({
  label,
  name,
  mask,
  icon,
  defaultValue,
  errorMessage,
  ...rest
}) => {
  const unform = useUnform(name);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    inputType,
    isFocused,
    isFilled,
    onChange,
    onFocus,
    onBlur,
    togglePass,
  } = useFieldFeedback({
    name,
    mask,
    unform,
    type: rest.type,
    input: { inputRef },
    disabled: rest.disabled,
  });

  useEffect(() => {
    if (unform) {
      unform.registerField<any>({
        name: unform.fieldName,
        ref: inputRef.current,
        getValue: (ref: HTMLInputElement) => {
          const { value } = ref;

          if (unform.formRef.current) {
            return InputHelper.returnFormat({ mask, value });
          }

          return ref.value;
        },
        setValue: (ref, value: string) => {
          if (!value) return;

          ref.value = value;
        },
        clearValue: ref => {
          ref.value = '';
        },
      });
    }
  }, [mask, name, unform]);

  const feedbacks = useMemo(() => {
    return {
      isErrored: (!!errorMessage || !!unform?.error) && !isFilled,
      isFocused,
      isFilled: isFilled || (defaultValue && !!unform?.defaultValue),
      isDisabled: rest.disabled,
    };
  }, [defaultValue, rest.disabled, errorMessage, isFilled, isFocused, unform]);

  const props = useMemo(() => {
    return {
      container: {
        hasLabel: !!label,
        ...feedbacks,
        disabled: rest.disabled,
        type: rest.type,
      },
      label: { label, ...feedbacks },
      icon: { type: rest.type, icon, onClick: togglePass, ...feedbacks },
      error: { message: errorMessage || unform?.error, ...feedbacks },
    };
  }, [errorMessage, feedbacks, togglePass, icon, label, rest, unform]);

  return (
    <Container {...props.container} className="input">
      <LabelContainer {...props.label} />

      <input
        {...rest}
        ref={inputRef}
        name={name}
        type={inputType}
        disabled={rest.disabled}
        placeholder={isFocused ? '' : rest.placeholder}
        defaultValue={unform?.defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <IconContainer {...props.icon} />

      <ErrorContainer {...props.error} />
    </Container>
  );
};

export { Input };
