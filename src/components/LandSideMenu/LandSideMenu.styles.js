import styled from 'styled-components';

export const SideMenuContainer = styled.div`
  position: fixed;
  width: 30%;
  height: 100%;
  right: 0;
  padding: 0;
  z-index: 30;
  overflow: hidden;
  display: flex;
`;

export const TextContainer = styled.div`
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.8);
  z-index: 30;
`;

export const ButtonContainer = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  pointer-events: auto;
  z-index: 1000;
`;

export const MenuHeader = styled.h1`
  margin-top: 10%;
  margin-left: 20%;
  font-weight: 700;
  font-style: normal;
  font-family: 'Alegreya Sans', sans-serif;
  color: #6199e5;
`;

export const ButtonImage = styled.img`
  width: 25px;
  height: auto;
`;
