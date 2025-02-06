import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { BOAT_CONSTANTS } from '@/domains/boat/constants/boat.constants';
import { boatStateAtom } from '@/domains/boat/atoms/boatAtoms';
import { isEnterIslandAtom } from '@/domains/island/atoms/playerStateAtoms';

import { useBoatControl } from '@/domains/boat/hooks/useBoatControl';
import { checkCollision } from '@/domains/boat/utils/boatUtils';

export const BoatController = ({ boatRef }) => {
  const [boatState, setBoatState] = useAtom(boatStateAtom);
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const keysPressed = useBoatControl();

  const raycasters = useRef([
    new THREE.Raycaster(), // 정면
    new THREE.Raycaster(), // 좌측
    new THREE.Raycaster(), // 우측
  ]);

  const targetRotation = useRef(new THREE.Euler());
  const prevPosition = useRef(new THREE.Vector3());
  const collisionCooldown = useRef(0);

  const updateBoatMovement = (keysPressed) => {
    let newPosition = { ...boatState.position };
    let newRotation = boatState.rotation;
    let moving = false;

    if (keysPressed['w'] || keysPressed['ㅈ']) {
      newPosition.x -= BOAT_CONSTANTS.MOVE_DISTANCE * Math.cos(newRotation);
      newPosition.z += BOAT_CONSTANTS.MOVE_DISTANCE * Math.sin(newRotation);
      moving = true;
    }
    if (keysPressed['s'] || keysPressed['ㄴ']) {
      newPosition.x += BOAT_CONSTANTS.MOVE_DISTANCE * Math.cos(newRotation);
      newPosition.z -= BOAT_CONSTANTS.MOVE_DISTANCE * Math.sin(newRotation);
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

  useFrame(({ scene }, delta) => {
    if (!boatRef.current || isEnterIsland) return;

    const forward = new THREE.Vector3(
      Math.cos(boatState.rotation),
      0,
      Math.sin(boatState.rotation),
    ).normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0));
    const left = right.clone().negate();

    // 이전 y 위치 보존
    const currentY = boatRef.current.position.y;
    prevPosition.current.copy(boatRef.current.position);

    const intersection = checkCollision(scene, forward, left, right, raycasters, boatRef);
    const collision = intersection !== null;

    if (!collision && collisionCooldown.current <= 0) {
      const { moving, newPosition, newRotation } = updateBoatMovement(keysPressed);

      if (moving) {
        // x,z 축만 lerp로 움직임
        const newPos = new THREE.Vector3(newPosition.x, currentY, newPosition.z);
        boatRef.current.position.lerp(newPos, BOAT_CONSTANTS.MOVE_SPEED);

        targetRotation.current.set(0, newRotation + BOAT_CONSTANTS.INITIAL_BOAT_ROTATION, 0);
        boatRef.current.rotation.y = THREE.MathUtils.lerp(
          boatRef.current.rotation.y,
          targetRotation.current.y,
          BOAT_CONSTANTS.ROTATION_SPEED,
        );
      }
    } else if (collision) {
      const normal = intersection.face.normal;
      normal.y = 0;
      normal.normalize();

      const reflectionVector = forward.clone().reflect(normal).multiplyScalar(0.1);
      reflectionVector.y = 0;

      // y 위치 보존하면서 충돌 처리
      const newPosition = prevPosition.current.clone().add(reflectionVector);
      newPosition.y = currentY;
      boatRef.current.position.copy(newPosition);

      collisionCooldown.current = 0.3;

      setBoatState((prev) => ({
        ...prev,
        position: {
          x: boatRef.current.position.x,
          y: boatRef.current.position.y,
          z: boatRef.current.position.z,
        },
      }));
    }

    collisionCooldown.current = Math.max(0, collisionCooldown.current - delta);
  });

  return null;
};
