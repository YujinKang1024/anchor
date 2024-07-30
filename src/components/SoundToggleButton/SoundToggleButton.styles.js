import styled from 'styled-components';

export const StyledSoundButton = styled.button`
  position: absolute;
  bottom: 0.5%;
  left: 1.5%;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  pointer-events: auto;
  z-index: 20;
`;

export const Container = styled.div`
  display: flex;
  justify-content: between;
`;

export const SoundText = styled.p`
  font-size: 1rem;
  margin-top: 40%;
  margin-right: 7%;
  color: #fff;
  font-family: 'Alegreya Sans', sans-serif;
  font-weight: 300;
  font-style: normal;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconLine = styled.div.attrs()`
  width: 1px;
  height: 1.5rem;
  background-color: #fff;
  margin: 0 2px;
`;
