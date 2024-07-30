import styled from 'styled-components';

const CloseButton = styled.button`
  position: absolute;
  top: 2.5%;
  right: 1.5%;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1500;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2rem;
    height: 0.1rem;
    background-color: #569dff;
    transform-origin: center;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export default CloseButton;
