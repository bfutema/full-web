import styled, { css } from 'styled-components';

const widthResponsive = css`
  @media (min-width: 0px) and (max-width: 540px) {
    width: 50px;
    min-width: 50px;
    max-width: 50px;

    padding: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    span {
      display: none;
    }

    svg {
      margin: 0;

      display: block;
    }
  }
`;

interface IContainerProps {
  size?: 'medium' | 'large';
  hasIcon?: boolean;
}

const buttonSizeVariations = {
  medium: css``,
  large: css``,
  callToAction: css`
    border-radius: 8px;
    background: #176bf8;
  `,
};

export const Container = styled.button<IContainerProps>`
  ${({ theme, size, hasIcon }) => css`
    width: 100%;
    max-width: 100%;
    min-height: 42px;

    border: 2px solid #176bf8;
    border-radius: ${theme.borders.radii[100]};
    background: #176bf866;

    color: ${theme.colors.white.normal};
    font-size: 16px;
    font-family: Poppins, sans-serif;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;

    padding: 8px 16px;

    user-select: none;
    cursor: pointer;

    transition: border 400ms, background 300ms, transform 100ms;

    display: flex;
    align-items: center;
    justify-content: ${hasIcon ? 'space-between' : 'center'};

    &:hover {
      background: #176bf8ff;
    }

    &:active {
      transform: scale(0.96);
    }

    ${size && buttonSizeVariations[size]}

    svg {
      width: 20px;
      min-width: 20px;
      height: 20px;
      min-height: 20px;

      margin-left: 12px;
    }

    ${widthResponsive}
  `}
`;
