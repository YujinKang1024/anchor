import styled from 'styled-components';

const MessageContainer = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ backgroundColor }) => backgroundColor || 'rgba(0, 0, 0, 0.7)'};
  color: ${({ textColor }) => textColor || '#fff'};
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 2000;
  animation: fadeInOut ${({ duration }) => duration || 3}s ease-in-out;

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

export default function PopupMessage({ message, backgroundColor, textColor, duration }) {
  return (
    <MessageContainer backgroundColor={backgroundColor} textColor={textColor} duration={duration}>
      {message}
    </MessageContainer>
  );
}
