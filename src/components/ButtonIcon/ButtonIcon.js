import styled, { css } from 'styled-components';

const ButtonIcon = styled.button`
  width: 30px;
  height: 30px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 50% 50%;
  border: none;
  background-color: ${({ theme }) => theme.add};
  border-radius: 10px;
  
    ${({ del }) =>
      del &&
      css`
        background-color: hsl(0, 100%, 50%);
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
      ${({ info }) =>
        info &&
        css`
          background-color: hsl(173, 100%, 50%);
        `}
      ${({ cancel }) =>
        cancel &&
        css`
          background-color: hsl(0, 6%, 28%);
        `}
`;

export default ButtonIcon;
