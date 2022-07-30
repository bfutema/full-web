import styled, { css } from 'styled-components';

export const Container = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.input.errored.border};
    font-size: 12px;
    font-weight: normal;
    letter-spacing: 0.4px;

    position: absolute;
    bottom: -18px;
    left: 0;
  `}
`;
