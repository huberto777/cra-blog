import styled, { css } from 'styled-components';
import magnifierIcon from 'assets/icons/magnifier.svg';

const Input = styled.input`
  background-color: ${({ theme }) => theme.grey200};
  border: none;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  padding: 10px 20px 10px 40px;

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.cancel};
    font-weight: ${({ theme }) => theme.bold};
  }

  ${({ search }) =>
    search &&
    css`
      padding: 10px 20px 10px 40px;
      font-size: ${({ theme }) => theme.fontSize.s};
      background-image: url(${magnifierIcon});
      background-size: 20px;
      background-position: 15px 50%;
      background-repeat: no-repeat;
    `}
`;

export default Input;


