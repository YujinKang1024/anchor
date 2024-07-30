import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1300;
`;

export const ModalContent = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const GradientBackground = styled.div`
  background: linear-gradient(to bottom, #fff 0%, #f5f9ff 10%, #bed9ff 40%, #569dff 100%);
  width: 100%;
  height: 100%;
`;
