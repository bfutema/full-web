import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

import { ITheme } from '@interfaces/generic/ITheme';

interface IIconContainerProps {
  isDisabled?: boolean;
}

const containerVariations = (theme: ITheme) => {
  return {
    disabled: css`
      cursor: pointer;

      &:hover {
        color: ${theme.colors.quarter[500]};
      }
    `,
  };
};

export const Container = styled.button.attrs({
  className: 'quarks-input-icon-container',
})<IIconContainerProps>`
  ${({ theme, isDisabled }) => css`
    width: 30px;
    height: 80%;

    border: 0;
    border-radius: ${theme.borders.radii[100]};
    background: 0;

    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition: background 400ms, color 400ms, transform 200ms;

    &:active {
      transform: scale(0.8);
    }

    &:hover {
      background: ${transparentize(0.9, theme.colors.quarter[500])};

      svg {
        stroke: ${theme.colors.quarter[500]};

        transition: stroke 400ms;
      }
    }

    ${!isDisabled && containerVariations(theme).disabled}
  `}
`;
