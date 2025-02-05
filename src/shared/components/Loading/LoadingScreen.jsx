import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #fff 0%, #f5f9ff 10%, #bed9ff 40%, #569dff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
`;

const LoadingText = styled.h2`
  color: #fff;
  font-size: 2rem;
`;

export const LoadingScreen = ({ onLoadingComplete, isVisible, showText = true }) => {
  const overlayRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, onComplete: onLoadingComplete });
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents = 'none';
          }
        },
      });
    }
  }, [isVisible, onLoadingComplete]);

  return (
    <LoadingOverlay
      ref={overlayRef}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      data-testid="loading-screen"
    >
      {showText && (
        <LoadingText ref={textRef} data-testid="landing-ui">
          Loading...
        </LoadingText>
      )}
    </LoadingOverlay>
  );
};
