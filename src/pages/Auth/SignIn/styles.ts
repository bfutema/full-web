import styled from 'styled-components';

import { Form } from '@contexts/ReactFormContext';

export const Container = styled.div`
  border: 1px solid #1e293b;
  border-radius: 16px;
  background-color: #1e293b;

  padding: 48px;

  gap: 24px;
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;

  strong {
    color: #f7f7f7;
    font-size: 24px;
    font-weight: bold;
  }

  p {
    color: #f7f7f7;
    font-size: 16px;
    font-weight: normal;

    a {
      color: #4f46e5cc;
      font-weight: bold;
      text-decoration: none;

      margin-left: 8px;

      position: relative;

      transition: color 400ms;

      &:after {
        content: '';

        width: 0;
        height: 2px;

        border-radius: 2px;
        background: #4f46e5;

        position: absolute;
        left: 0;
        bottom: -2px;

        transition: all 400ms;
      }

      &:hover {
        color: #4f46e5;

        &:after {
          width: 100%;
        }
      }
    }
  }
`;

export const Unform = styled(Form)`
  width: 320px;

  gap: 32px;
  display: flex;
  flex-direction: column;
`;
