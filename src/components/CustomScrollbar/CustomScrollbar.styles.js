import styled from 'styled-components';

export const ScrollContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
`;

export const Scrollbar = styled.div`
  position: absolute;
  right: 0.5%;
  width: 0.4rem;
  height: 97%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.3rem;
  z-index: 2;
`;

export const Thumb = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.3rem;
  cursor: pointer;
`;
