import styled, { css } from 'styled-components';

import { ITheme } from '@interfaces/generic/ITheme';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isDisabled?: boolean;
}

const containerVariations = (theme: ITheme) => ({
  focused: css`
    outline-color: ${theme.colors.input.focused.border};
    background: ${theme.colors.input.focused.label};

    color: ${theme.colors.input.focused.text};
  `,
  filled: css`
    outline-color: ${theme.colors.input.filled.border};
    background: ${theme.colors.input.filled.label};

    color: ${theme.colors.input.filled.text};
  `,
  disabled: css`
    outline-color: ${theme.colors.input.disabled.border};
    background: ${theme.colors.input.disabled.label};

    color: ${theme.colors.input.disabled.text};
  `,
  show: css`
    top: -11px;
    left: 8px;

    opacity: 1 !important;
    visibility: visible !important;
  `,
  hide: css`
    top: 0;
    left: 8px;

    opacity: 0 !important;
    visibility: hidden !important;
  `,
});

export const Container = styled.div.attrs({
  className: 'quarks-input-label-container',
})<IContainerProps>`
  ${({ theme, isFocused, isFilled, isDisabled }) => css`
    background: ${theme.colors.input.normal.label};

    color: ${theme.colors.white};
    font-size: 12px;
    font-weight: normal;
    line-height: initial;

    padding: 2px 8px;

    position: absolute;

    transition: all 400ms;

    display: flex;
    align-items: center;
    justify-content: center;

    ${isFocused
      ? containerVariations(theme).show
      : containerVariations(theme).hide}
    ${isFocused && containerVariations(theme).focused}
    ${isFilled && containerVariations(theme).filled}
    ${isDisabled && containerVariations(theme).disabled}
    ${isDisabled && containerVariations(theme).show}
    ${isFilled && containerVariations(theme).show}
  `}
`;
