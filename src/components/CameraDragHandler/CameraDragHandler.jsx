import { useEffect, useCallback, useState, useRef } from 'react';
import { DRAG_THRESHOLD, VERTICAL_DRAG_LIMIT } from '../../constants/constants';

export default function CameraDragHandler({ onRotate }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const initialX = useRef(0);
  const initialY = useRef(0);

  const handleMouseDown = useCallback((event) => {
    if (event.button === 0) {
      setIsMouseDown(true);
      setStartX(event.clientX);
      setStartY(event.clientY);
      initialX.current = event.clientX;
      initialY.current = event.clientY;
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
        const deltaY = event.clientY - initialY.current;
        if (
          !isDragging &&
          (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)
        ) {
          setIsDragging(true);
          setStartX(event.clientX);
          setStartY(event.clientY);
        }
        if (isDragging) {
          const deltaX = event.clientX - startX;
          const deltaY = event.clientY - startY;

          const clampedDeltaY = Math.max(
            -VERTICAL_DRAG_LIMIT,
            Math.min(VERTICAL_DRAG_LIMIT, deltaY),
          );

          onRotate(-deltaX * 0.005, -clampedDeltaY * 0.005);
          setStartX(event.clientX);
          setStartY(event.clientY);
        }
      }
    },
    [isMouseDown, isDragging, startX, startY, initialX, initialY, onRotate],
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
