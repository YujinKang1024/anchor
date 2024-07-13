import styled from 'styled-components';

export const StyledButton = styled.button`
  position: absolute;
  padding: 10px 30px;
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  right: ${({ right }) => right || 'auto'};
  z-index: 2;
  border: 1px solid;
  border-color: #569dff;
  border-radius: 8px;
  font-size: 1.5rem;
  background-color: #fff;
  color: #569dff;
  cursor: pointer;
  font-family: 'Alegreya Sans', sans-serif;
  font-weight: 300;
  font-style: normal;
`;
