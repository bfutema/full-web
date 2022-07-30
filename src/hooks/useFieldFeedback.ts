import React, { useState, useCallback, useLayoutEffect } from 'react';

import { InputHelper } from '@helpers/InputHelper';
import { IFeedbackProps, IMask } from '@interfaces/components/IInput';

import { IUseUnformReturn } from './useUnform';

type InputType = React.HTMLInputTypeAttribute;
type Ref<T> = React.RefObject<T>;
type Input = { inputRef: Ref<HTMLInputElement> };
type Select = { selectRef: Ref<HTMLSelectElement>; selectedCount: number };
type DatePicker = { inputRef: Ref<HTMLInputElement>; selectedDate?: Date };
type DateRange = { inputRef: Ref<HTMLInputElement>; selectedDates: Date[] };

interface IUseFieldFeedbackProps {
  name: string;
  mask?: IMask;
  type?: InputType;
  disabled?: boolean;

  input?: Input;
  select?: Select;
  datePicker?: DatePicker;
  dateRange?: DateRange;

  unform?: IUseUnformReturn;
}

interface IUseFieldFeedbackReturn
  extends Pick<IFeedbackProps, 'isFocused' | 'isFilled'> {
  inputType?: InputType;
  calendarIsOpen: boolean;
  setCalendarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  togglePass: () => void;
}

function useFieldFeedback({
  name,
  mask,
  type = 'text',
  disabled,

  input,
  select,
  datePicker,
  dateRange,

  unform,
}: IUseFieldFeedbackProps): IUseFieldFeedbackReturn {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const [inputType, setInputType] = useState<InputType>(type);
  const [passwordIsShow, setPasswordIsShow] = useState<boolean>(false);
  const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (unform) {
      if (input) {
        const value = unform.defaultValue;

        setIsFilled(!!value || !!input.inputRef.current?.value);

        if (unform.formRef.current) {
          const { setFieldValue } = unform.formRef.current;

          InputHelper.format({ name, value, mask, setFieldValue });
        }
      }
    }
  }, [input, mask, name, unform]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (unform) {
        if (unform.formRef.current) {
          const { value } = e.target;
          const { setFieldValue } = unform.formRef.current;

          if (input) InputHelper.format({ name, value, mask, setFieldValue });
        }
      }
    },
    [input, mask, name, unform],
  );

  const togglePass = useCallback(() => {
    setPasswordIsShow(prevState => !prevState);

    setInputType(passwordIsShow ? 'text' : 'password');
  }, [passwordIsShow]);

  const onFocus = useCallback(() => {
    if (disabled) return;

    setIsFocused(true);

    if (datePicker) setCalendarIsOpen(true);

    if (dateRange) setCalendarIsOpen(true);
  }, [datePicker, dateRange, disabled]);

  const onBlur = useCallback(() => {
    setIsFocused(false);

    if (input) setIsFilled(!!input.inputRef.current?.value);

    if (select) setIsFilled(select.selectedCount > 0);

    if (datePicker) setIsFilled(!!datePicker.selectedDate);

    if (dateRange) setIsFilled(dateRange.selectedDates.length === 2);
  }, [datePicker, dateRange, input, select]);

  return {
    inputType,
    calendarIsOpen,
    setCalendarIsOpen,
    isFocused,
    isFilled,
    onChange,
    onFocus,
    onBlur,
    togglePass,
  };
}

export { useFieldFeedback };
