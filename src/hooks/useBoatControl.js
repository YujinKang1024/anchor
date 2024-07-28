import { useCallback, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { boatPositionAtom, boatRotationAtom, isMovingAtom } from '../utils/atoms';

import { BOAT_CONSTANTS } from '../constants/constants';

export function useBoatControl() {
  const [boatPosition, setBoatPosition] = useAtom(boatPositionAtom);
  const [boatRotation, setBoatRotation] = useAtom(boatRotationAtom);
  const [isMoving, setIsMoving] = useAtom(isMovingAtom);

  const keysPressed = useRef({});

  const updateBoatPosition = useCallback(() => {
    let newPosition = { ...boatPosition };
    let newRotation = boatRotation;
    let moving = false;

    if (keysPressed.current['w'] || keysPressed.current['ㅈ']) {
      newPosition.x -= BOAT_CONSTANTS.MOVE_DISTANCE * Math.cos(boatRotation);
      newPosition.z += BOAT_CONSTANTS.MOVE_DISTANCE * Math.sin(boatRotation);
      moving = true;
    }
    if (keysPressed.current['s'] || keysPressed.current['ㄴ']) {
      newPosition.x += BOAT_CONSTANTS.MOVE_DISTANCE * Math.cos(boatRotation);
      newPosition.z -= BOAT_CONSTANTS.MOVE_DISTANCE * Math.sin(boatRotation);
      moving = true;
    }
    if (keysPressed.current['a'] || keysPressed.current['ㅁ']) {
      newRotation += BOAT_CONSTANTS.ROTATION_ANGLE;
      moving = true;
    }
    if (keysPressed.current['d'] || keysPressed.current['ㅇ']) {
      newRotation -= BOAT_CONSTANTS.ROTATION_ANGLE;
      moving = true;
    }

    if (moving) {
      setBoatPosition(newPosition);
      setBoatRotation(newRotation);
      setIsMoving(true);
    } else if (isMoving) {
      setIsMoving(false);
    }
  }, [boatPosition, boatRotation, setBoatPosition, setBoatRotation, setIsMoving, isMoving]);

  const handleKeyDown = useCallback((event) => {
    keysPressed.current[event.key.toLowerCase()] = true;
  }, []);

  const handleKeyUp = useCallback((event) => {
    keysPressed.current[event.key.toLowerCase()] = false;
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const intervalId = setInterval(updateBoatPosition, 16);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(intervalId);
    };
  }, [handleKeyDown, handleKeyUp, updateBoatPosition]);
}
