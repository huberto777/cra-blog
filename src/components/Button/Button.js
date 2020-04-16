import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 0;
  width: 50px;
  height: 20px;
  background-color: ${({ theme }) => theme.add};
  border: none;
  border-radius: 50px;
  font-family: 'Montserrat';
  font-weight: ${({ theme }) => theme.bold};
  font-size: 16px;
  text-transform: uppercase;

  ${({ del }) =>
    del &&
    css`
      background-color: hsl(8, 100%, 50%);
    `}
    ${({ edit }) =>
      edit &&
      css`
        background-color: hsl(233, 100%, 50%);
      `}
  ${({ update }) =>
    update &&
    css`
      background-color: hsl(122, 100%, 58%);
    `}
  ${({ cancel }) =>
    cancel &&
    css`
      background-color: hsl(0, 6%, 28%);
    `}
`;

export default Button;
