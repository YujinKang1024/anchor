import styled from 'styled-components';

const WarningContainer = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 2000;
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0;
    }
    10%,
    90% {
      opacity: 1;
    }
  }
`;

export default function WarningMessage({ message }) {
  return <WarningContainer>{message}</WarningContainer>;
}
