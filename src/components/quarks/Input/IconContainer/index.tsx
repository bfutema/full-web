import React from 'react';
import { FiEye, FiEyeOff, FiMail } from 'react-icons/fi';

import { useContextSelector } from 'use-context-selector';

import { ThemeContext } from '@contexts/ReactThemeContext';

import { Container } from './styles';

interface IIconProps {
  icon?: any;
  type?: string;
  isVisible?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const IconContainer: React.FC<IIconProps> = ({
  icon: Icon,
  type,
  isVisible,
  isDisabled,
  onClick,
}) => {
  const { white } = useContextSelector(ThemeContext, state => state.colors);

  if (type === 'password') {
    return (
      <Container type="button" isDisabled={isDisabled} onClick={onClick}>
        {isVisible ? (
          <FiEye size={16} color={white.normal} />
        ) : (
          <FiEyeOff size={16} color={white.normal} />
        )}
      </Container>
    );
  }

  if (type === 'email') {
    return (
      <Container type="button" isDisabled={isDisabled}>
        <FiMail size={16} color={white.normal} />
      </Container>
    );
  }

  if (!Icon) return null;

  return (
    <Container type="button" isDisabled={isDisabled}>
      <Icon size={24} color={white.normal} />
    </Container>
  );
};

export { IconContainer };
