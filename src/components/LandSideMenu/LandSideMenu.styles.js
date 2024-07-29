import styled from 'styled-components';

export const SideMenuContainer = styled.div`
  position: absolute;
  width: 30%;
  height: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 1%;
  z-index: 10;
`;

export const MenuHeader = styled.h1`
  position: absolute;
  margin-top: 8%;
  margin-left: 15%;
  font-weight: 700;
  font-style: normal;
  font-family: 'Alegreya Sans', sans-serif;
  color: #6199e5;
`;

export const ButtonImage = styled.img`
  position: absolute;
  width: 25px;
  top: 50%;
  height: auto;
`;
