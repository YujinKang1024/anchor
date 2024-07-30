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
  background: linear-gradient(to bottom, #fff 0%, #f5f9ff 10%, #bed9ff 40%, #569dff 100%);
  width: 100%;
  height: 100%;
`;

export const TextContainer = styled.div`
  padding: 4% 6%;
`;

export const Text = styled.p`
  font-size: 1.6rem;
  font-weight: ${({ fontWeight = 400 }) => `${fontWeight}`};
  margin-top: ${({ marginTop }) => `${marginTop}`};
  color: ${({ color }) => `${color}`};
`;

export const HighlightText = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ color }) => `${color}`};
`;
