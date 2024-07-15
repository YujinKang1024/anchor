import styled from 'styled-components';

export const ScrollContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  pointer-events: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  z-index: 10;
`;

export const VirtualContent = styled.div`
  width: 100%;
  height: ${({ height }) => `${height}px`};
`;

export const Scrollbar = styled.div`
  position: fixed;
  right: 0.5%;
  width: 0.4rem;
  height: 97%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.3rem;
  z-index: 11;
`;

export const Thumb = styled.div`
  position: absolute;
  top: ${({ top = 0 }) => `${top}%`};
  left: 0;
  width: 100%;
  height: 10%;
  background: rgba(0, 0, 0, 1);
  border-radius: 0.3rem;
  cursor: pointer;
`;
