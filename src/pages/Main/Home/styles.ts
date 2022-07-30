import styled, { css } from 'styled-components';

export const Container = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

export const Users = styled.div`
  /* height: 500px;

  overflow-y: scroll; */

  gap: 16px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`;

export const User = styled.div`
  ${({ theme }) => css`
    border: 2px solid ${theme.colors.primary[500]};
    background: ${theme.colors.primary[500]};
  `}
`;
