import React from 'react';

import { Container, Animation, Inner } from './styles';

interface ILoadingProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<ILoadingProps> = ({ text, size = 'large' }) => {
  return (
    <Container>
      {text && <span>{text}</span>}

      <Animation size={size}>
        <Inner className="one" />

        <Inner className="two" />

        <Inner className="three" />
      </Animation>
    </Container>
  );
};

export { Loading };
