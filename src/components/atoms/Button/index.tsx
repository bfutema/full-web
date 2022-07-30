import React from 'react';

import { Container } from './styles';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: any;
  size?: 'medium' | 'large';
}

const Button: React.FC<IButtonProps> = ({ icon: Icon, children, ...rest }) => {
  return (
    <Container type="button" hasIcon={!!Icon} {...rest}>
      <span>{children}</span>

      {Icon && <Icon />}
    </Container>
  );
};

export { Button };
