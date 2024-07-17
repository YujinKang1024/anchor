import { useEffect, useCallback } from 'react';

export default function CameraDragHandler({ onRotate }) {
  const handleMouseMove = useCallback(
    (event) => {
      if (event.buttons === 1) {
        const deltaX = event.movementX;
        onRotate(-deltaX * 0.005);
      }
    },
    [onRotate],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return null;
}
