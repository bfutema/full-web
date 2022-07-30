import { HTMLInputTypeAttribute } from 'react';

import styled, { css } from 'styled-components';

import { IFeedbackProps } from '@interfaces/components/IInput';
import { ITheme } from '@interfaces/generic/ITheme';

interface IContainerProps extends IFeedbackProps {
  type?: HTMLInputTypeAttribute;
}

const containerVariations = (theme: ITheme, hasLabel?: boolean) => ({
  errored: css`
    outline-color: ${theme.colors.input.errored.border};

    transition: none;
  `,
  focused: css`
    outline-color: ${theme.colors.input.focused.border};
    box-shadow: 0px 6px 4px rgba(27, 32, 60, 0.2);
    background: ${theme.colors.black.lighter};

    input {
      height: ${hasLabel ? '82%' : '100%'};
    }
  `,
  filled: css`
    outline-color: ${theme.colors.input.filled.border};
    background: ${theme.colors.black.lighter};

    input {
      height: ${hasLabel ? '82%' : '100%'};
    }
  `,
  disabled: css`
    outline-color: ${theme.colors.input.disabled.border};
    background: transparent;

    color: ${theme.colors.input.disabled.text};

    input {
      height: ${hasLabel ? '82%' : '100%'};

      color: ${theme.colors.input.disabled.text};

      user-select: none;

      &::placeholder {
        color: ${theme.colors.input.disabled.text};
      }
    }
  `,
});

export const Container = styled.div<IContainerProps>`
  ${({
    theme,
    isErrored,
    isFocused,
    isFilled,
    disabled,
    hasLabel,
    type,
  }) => css`
    width: 100%;
    height: 36px;

    border-radius: ${theme.borders.radii[100]};
    outline: 1px solid ${theme.colors.input.normal.border};
    background: ${theme.colors.white};

    color: ${theme.colors.input.normal.text};
    font-family: Roboto, Poppins, Archivo, sans-serif;

    padding: 0 4px 0 8px;

    position: relative;

    transition: all 400ms;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    box-sizing: border-box;

    input {
      height: 100%;

      border: 0;
      background: transparent;
      outline: 0;

      color: ${theme.colors.text.default};
      font-size: 14px;

      flex: 1;

      &::placeholder {
        color: #858585;
      }

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
    }

    &:hover {
      outline-color: ${theme.colors.input.focused.border};
    }

    ${isFilled && containerVariations(theme, hasLabel).filled}
    ${isFocused && containerVariations(theme, hasLabel).focused}
    ${disabled && containerVariations(theme, hasLabel).disabled}
    ${isErrored && containerVariations(theme, hasLabel).errored}
    ${type === 'hidden' &&
    css`
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      opacity: 0 !important;
      visibility: hidden !important;
    `}
  `}
`;
