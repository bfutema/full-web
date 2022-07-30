import { animated } from 'react-spring';

import styled, { css } from 'styled-components';

import { ToastType } from '@contexts/ReactToastContext';

interface IToastProps {
  type?: ToastType;
}

const toastVariations = {
  info: css`
    background: #00b1ff;
  `,
  success: css`
    background: #0ce5a5;
  `,
  warning: css`
    background: #fbbe32;
  `,
  error: css`
    background: #ff6c70;
  `,
};

export const Container = styled(animated.div)<IToastProps>`
  ${({ theme, type = 'info' }) => css`
    width: fit-content;

    border-radius: 6px;
    background: #0ce5a5;
    /* box-shadow: 0px 6px 6px rgba(27, 32, 60, 0.2); */
    box-shadow: 0px 6px 6px ${theme.colors.black.normal};

    margin: 0 auto 0 auto;
    padding: 12px 16px;

    position: relative;

    cursor: pointer;

    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;

    pointer-events: none;

    z-index: 10000;

    ${toastVariations[type]}

    & + div {
      margin: 16px auto 0 auto !important;
    }

    div {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      strong {
        color: #1b203c;
      }
    }

    button {
      height: 34px;

      border: none;
      background: none;

      transition: filter 400ms;

      pointer-events: initial;

      &:hover {
        filter: brightness(1.8);
        cursor: pointer;
      }
    }
  `}
`;
