import React from 'react';

import { IFeedbackProps } from '@interfaces/components/IInput';

import { Container } from './styles';

interface IInputContainerProps extends IFeedbackProps {
  cRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  children?: React.ReactNode;
}

const InputContainer: React.FC<IInputContainerProps> = ({
  cRef,
  className,
  children,
  type,
  ...rest
}) => {
  return (
    <Container ref={cRef} type={type} {...rest} className={className}>
      {children}
    </Container>
  );
};

export { InputContainer };
