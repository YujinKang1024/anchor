import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { BOAT_CONSTANTS } from '@/domains/boat/constants/boat.constants';
import { boatStateAtom } from '@/domains/boat/atoms/boatAtoms';
import { isEnterIslandAtom } from '@/domains/island/atoms/playerStateAtoms';

import { useBoatControl } from '@/domains/boat/hooks/useBoatControl';
import { checkCollision, handleCollision } from '@/domains/boat/utils/boatUtils';

export const BoatController = ({ boatRef }) => {
  const [boatState, setBoatState] = useAtom(boatStateAtom);
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const keysPressed = useBoatControl();

  const targetRotation = useRef(new THREE.Euler());
  const prevPosition = useRef(new THREE.Vector3());

  const updateBoatMovement = (keysPressed) => {
    let newPosition = { ...boatState.position };
    let newRotation = boatState.rotation;
    let moving = false;

    if (keysPressed['w'] || keysPressed['ㅈ']) {
      newPosition.x += BOAT_CONSTANTS.MOVE_DISTANCE * Math.cos(newRotation);
      newPosition.z -= BOAT_CONSTANTS.MOVE_DISTANCE * Math.sin(newRotation);
      moving = true;
    }
    if (keysPressed['s'] || keysPressed['ㄴ']) {
      newPosition.x -= BOAT_CONSTANTS.MOVE_DISTANCE * Math.cos(newRotation);
      newPosition.z += BOAT_CONSTANTS.MOVE_DISTANCE * Math.sin(newRotation);
      moving = true;
    }
    if (keysPressed['a'] || keysPressed['ㅁ']) {
      newRotation += BOAT_CONSTANTS.ROTATION_ANGLE;
      moving = true;
    }
    if (keysPressed['d'] || keysPressed['ㅇ']) {
      newRotation -= BOAT_CONSTANTS.ROTATION_ANGLE;
      moving = true;
    }

    if (moving) {
      setBoatState((prev) => ({
        ...prev,
        position: newPosition,
        rotation: newRotation,
        isMoving: true,
      }));
    } else {
      setBoatState((prev) => ({ ...prev, isMoving: false }));
    }

    return { moving, newPosition, newRotation };
  };

  useFrame(({ scene }) => {
    if (!boatRef.current || isEnterIsland) return;

    const currentY = boatRef.current.position.y;
    prevPosition.current.copy(boatRef.current.position);

    const intersections = checkCollision(scene, boatRef);

    if (intersections.length > 0) {
      const collisionResult = handleCollision(
        intersections,
        prevPosition.current,
        currentY,
        boatState,
      );

      if (collisionResult) {
        const { position: newPosition, repulsionForce } = collisionResult;

        const lerpFactor = THREE.MathUtils.clamp(repulsionForce * 0.25, 0.15, 0.5);
        boatRef.current.position.lerp(newPosition, lerpFactor);

        setBoatState((prev) => ({
          ...prev,
          position: {
            x: boatRef.current.position.x,
            y: boatRef.current.position.y,
            z: boatRef.current.position.z,
          },
          isMoving: true,
        }));
      }
    } else {
      const { moving, newPosition, newRotation } = updateBoatMovement(keysPressed);

      if (moving) {
        const newPos = new THREE.Vector3(newPosition.x, currentY, newPosition.z);
        boatRef.current.position.lerp(newPos, BOAT_CONSTANTS.MOVE_SPEED);

        targetRotation.current.set(0, newRotation + BOAT_CONSTANTS.INITIAL_BOAT_ROTATION, 0);
        boatRef.current.rotation.y = THREE.MathUtils.lerp(
          boatRef.current.rotation.y,
          targetRotation.current.y,
          BOAT_CONSTANTS.ROTATION_SPEED,
        );
      }
    }
  });

  return null;
};
