import React from 'react';

import { Container } from './styles';

interface ILabelContainerProps {
  label?: string;
  isFocused: boolean;
  isFilled: boolean;
  isDisabled?: boolean;
}

const LabelContainer: React.FC<ILabelContainerProps> = ({
  label,
  isFocused,
  isFilled,
  isDisabled,
}) => {
  if (!label) return null;

  return (
    <Container
      isFocused={isFocused}
      isFilled={isFilled}
      isDisabled={isDisabled}
    >
      {label}
    </Container>
  );
};

export { LabelContainer };
