import styled from 'styled-components';
import { useState, useEffect } from 'react';

const MouseFollower = styled.div.attrs((props) => ({
  style: {
    left: `${props.x}px`,
    top: `${props.y}px`,
  },
}))`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: orange;
  border-radius: 50%;
  opacity: 0.7;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

export const MouseFollowerUI = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <MouseFollower x={mousePosition.x} y={mousePosition.y} />;
};
