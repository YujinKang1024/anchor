import styled from 'styled-components';

export const StyledPerspectiveDModal = styled.div`
  position: absolute;
  width: 35%;
  height: 70%;
  top: 12%;
  left: 9%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  z-index: 1200;
  pointer-events: auto;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  z-index: 1100;
  pointer-events: auto;
  perspective: 1200px;
`;
