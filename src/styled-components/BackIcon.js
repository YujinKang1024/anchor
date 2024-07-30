import styled from 'styled-components';

export const BackIconButton = styled.img`
  position: absolute;
  width: 60px;
  left: 2%;
  top: 3%;
  z-index: 1000;
  cursor: pointer;
  pointer-events: auto;
  filter: brightness(1.4);

  &:hover {
    filter: brightness(1.1);
  }
`;
