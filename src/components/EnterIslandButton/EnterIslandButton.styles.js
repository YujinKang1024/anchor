import styled from 'styled-components';

export const ButtonContainer = styled.button`
  width: 13%;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  pointer-events: auto;
  cursor: pointer;
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
`;

export const ButtonImage = styled.img`
  width: 100px;
  height: auto;
  transition: transform 0.3s ease;

  ${ButtonContainer}:hover & {
    animation: shake 0.5s ease-in-out infinite;
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

export const ButtonText = styled.span`
  margin-top: 4%;
  font-size: 2rem;
  font-weight: 700;
  font-style: normal;
  font-family: 'Alegreya Sans', sans-serif;
  color: #5d9bee;
  text-shadow:
    -2px 0 #fff,
    0 2px #fff,
    2px 0 #fff,
    0 -2px #fff;
`;
