import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: transparent;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    ${({ theme }) => css`
      background: ${theme.colors.background} !important;

      color: ${theme.colors.text.inDark};
      -webkit-font-smoothing: antialiased;
    `}
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;

    font-size: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;
  }

  body,
  input,
  textarea,
  button {
    ${() => css`
      font-family: 'Nunito';
      font-weight: 500;
    `}
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: bold;
  }

  li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
