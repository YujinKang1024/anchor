import { useEffect, useCallback, useState, useRef } from 'react';
import { DRAG_THRESHOLD } from '../../constants/constants';

export default function CameraDragHandler({ onRotate }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);

  const initialX = useRef(0);

  const handleMouseDown = useCallback((event) => {
    if (event.button === 0) {
      setIsMouseDown(true);
      setStartX(event.clientX);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (isMouseDown) {
        const deltaX = event.clientX - initialX.current;
        if (!isDragging && Math.abs(deltaX) > DRAG_THRESHOLD) {
          setIsDragging(true);
          setStartX(event.clientX);
        }
        if (isDragging) {
          const deltaX = event.clientX - startX;
          onRotate(-deltaX * 0.005);
          setStartX(event.clientX);
        }
      }
    },
    [isMouseDown, isDragging, startX, initialX, onRotate],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove]);

  return null;
}
