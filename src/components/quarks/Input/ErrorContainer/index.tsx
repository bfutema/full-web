import React from 'react';

import { Container } from './styles';

interface IErrorContainerProps {
  message?: string;
  isFilled?: boolean;
}

const ErrorContainer: React.FC<IErrorContainerProps> = ({
  message,
  isFilled,
}) => {
  if (!message) return null;

  if (message && isFilled) return null;

  return <Container>{message}</Container>;
};

export { ErrorContainer };
