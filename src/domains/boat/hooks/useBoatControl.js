import { useCallback, useEffect, useRef } from 'react';

export function useBoatControl() {
  const keysPressed = useRef({});

  const handleKeyDown = useCallback((event) => {
    keysPressed.current[event.key.toLowerCase()] = true;
  }, []);

  const handleKeyUp = useCallback((event) => {
    keysPressed.current[event.key.toLowerCase()] = false;
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return keysPressed.current;
}
