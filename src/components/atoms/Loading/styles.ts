import styled, { css } from 'styled-components';

export const Container = styled.div`
  gap: 16px;
  display: flex;
`;

interface IAnimationProps {
  size: 'small' | 'medium' | 'large';
}

const animationVariations = {
  small: css`
    width: 24px;
    height: 24px;
  `,
  medium: css`
    width: 48px;
    height: 48px;
  `,
  large: css`
    width: 62px;
    height: 62px;
  `,
};

export const Animation = styled.div<IAnimationProps>`
  ${({ size }) => css`
    width: 64px;
    height: 64px;

    border-radius: 50%;

    margin: auto;

    perspective: 800px;

    ${animationVariations[size]}
  `}
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 50%;

  position: absolute;

  &.one {
    border-bottom: 3px solid #efeffa;

    top: 0%;
    left: 0%;

    animation: rotate-one 1s linear infinite;
  }

  &.two {
    border-right: 3px solid #efeffa;

    right: 0%;
    top: 0%;

    animation: rotate-two 1s linear infinite;
  }

  &.three {
    border-top: 3px solid #efeffa;

    right: 0%;
    bottom: 0%;

    animation: rotate-three 1s linear infinite;
  }

  @keyframes rotate-one {
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-two {
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
  }

  @keyframes rotate-three {
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
  }
`;
