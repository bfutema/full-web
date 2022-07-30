import React, { useMemo } from 'react';
import {
  HiOutlineInformationCircle,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineXCircle,
} from 'react-icons/hi';
import { SpringValue } from 'react-spring';

import { useContextSelector } from 'use-context-selector';

import { X } from '@assets/icons';
import { ThemeContext } from '@contexts/ReactThemeContext';
import { ToastMessage } from '@contexts/ReactToastContext';
import { useToast } from '@hooks/useToast';

import { Container } from './styles';

interface IToastProps {
  message: ToastMessage;
  animation: {
    opacity: SpringValue<number>;
    right: SpringValue<string>;
    life: SpringValue<string>;
  };
}

const Toast: React.FC<IToastProps> = ({ message, animation }) => {
  const colors = useContextSelector(ThemeContext, state => state.colors);

  const { removeToast } = useToast();

  const icons = useMemo(() => {
    const props = { size: 32, color: colors.background };

    return {
      info: <HiOutlineInformationCircle {...props} />,
      success: <HiOutlineCheckCircle {...props} />,
      warning: <HiOutlineExclamationCircle {...props} />,
      error: <HiOutlineXCircle {...props} />,
    };
  }, [colors.background]);

  return (
    <Container key={message.id} type={message.type} style={{ ...animation }}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <X />
      </button>
    </Container>
  );
};

export { Toast };
