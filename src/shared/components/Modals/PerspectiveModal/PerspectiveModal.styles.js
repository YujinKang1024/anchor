import styled from 'styled-components';

export const StyledPerspectiveModal = styled.div`
  position: absolute;
  width: 35%;
  height: 70%;
  top: 12%;
  left: 9%;
  padding: 35px;
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

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 350;
  color: black;
`;

export const ContentContainer = styled.div`
  position: absolute;
  width: 80%;
  padding: 20px;
  top: 15%;
`;

export const HighlightText = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #000;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const SteamIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
