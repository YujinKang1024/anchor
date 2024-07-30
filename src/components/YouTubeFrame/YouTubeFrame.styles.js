import styled from 'styled-components';

export const FrameContainer = styled.div`
  position: relative;
  right: -22%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 40%;
  height: 48%;
  transform: rotateY(-10deg);
  z-index: 1200
  overflow: hidden;
`;

export const StyledIframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 0;
  pointer-events: auto;
`;
