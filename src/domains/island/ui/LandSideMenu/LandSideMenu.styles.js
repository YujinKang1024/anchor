import styled from 'styled-components';

export const SideMenuContainer = styled.div`
  position: fixed;
  width: 35%;
  height: 100%;
  right: 0;
  padding: 0;
  z-index: 30;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const TextContainer = styled.div`
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  padding: 6%;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  cursor: ${({ $isShowPerspectiveModal }) => ($isShowPerspectiveModal ? 'default' : 'pointer')};
  pointer-events: auto;
  z-index: 1000;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 6%;
`;
export const Description = styled.p`
  font-size: 1.3rem;
  margin: 3% 5% 3% 5%;
  color: #fff;
`;

export const DescriptionSmall = styled.p`
  font-size: 0.9rem;
  margin: 1%;
  color: #a2a2a2;
`;

export const MenuHeader = styled.h1`
  font-size: 3rem;
  margin-top: 16%;
  margin-bottom: 10%;
  font-weight: 700;
  font-style: normal;
  font-family: 'Alegreya Sans', sans-serif;
  color: #6199e5;
`;

export const ButtonImage = styled.img`
  width: 25px;
  height: auto;
`;
