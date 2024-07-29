import styled from 'styled-components';

export const HPBarContainer = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 35%;
  height: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  opacity: 0;
  display: flex;
  align-items: center;
  padding: 3px;
`;

export const HPFill = styled.div`
  height: 100%;
  width: ${({ $playerHP = 100 }) => `${$playerHP}%`};
  background-color: #ff4136;
  border-radius: 8px;
`;
