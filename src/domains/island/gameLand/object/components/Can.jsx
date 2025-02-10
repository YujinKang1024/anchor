import { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { PHYSICS_CONSTANTS } from '@/domains/island/gameLand';

import can from '@/assets/models/can.glb';

export const Can = ({ initialPosition }) => {
  const { scene: canScene } = useGLTF(can);
  const modelRef = useRef();
  const canModel = canScene.clone();

  const canState = useRef({
    position: new THREE.Vector3(...initialPosition),
    velocity: new THREE.Vector3(
      Math.random() - 0.5,
      PHYSICS_CONSTANTS.INITIAL_DROP_SPEED,
      PHYSICS_CONSTANTS.FORWARD_SPEED + Math.random() * PHYSICS_CONSTANTS.FORWARD_SPEED_VARIATION,
    ),
    rotation: new THREE.Euler(-Math.PI / 2, 0, -Math.PI / 2),
    isOnFloor: false,
    isRolling: false,
    maxRollSpeed: 0,
  });

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    const can = canState.current;

    if (!can.isOnFloor) {
      can.velocity.y -= PHYSICS_CONSTANTS.GRAVITY * delta;
    }

    can.position.add(can.velocity.clone().multiplyScalar(delta));

    const floorLevel = PHYSICS_CONSTANTS.FLOOR_HEIGHT + PHYSICS_CONSTANTS.CAN_RADIUS;

    if (can.position.y < floorLevel) {
      can.position.y = floorLevel;

      if (!can.isOnFloor) {
        handleGroundCollision(can);
      }
    }

    if (can.isRolling) {
      handleRolling(can, delta);
    }

    modelRef.current.position.copy(can.position);
    modelRef.current.rotation.copy(can.rotation);
  });

  const handleGroundCollision = (can) => {
    const bounceForce = Math.abs(can.velocity.y) * PHYSICS_CONSTANTS.BOUNCE_FACTOR;
    can.velocity.y = bounceForce > PHYSICS_CONSTANTS.BOUNCE_FACTOR ? bounceForce : 0;

    if (can.velocity.z > 0) {
      can.velocity.z = Math.max(can.velocity.z, 8);
      can.maxRollSpeed = can.velocity.z;
    }

    can.velocity.z *= PHYSICS_CONSTANTS.INITIAL_FRICTION;
    can.isOnFloor = bounceForce < PHYSICS_CONSTANTS.BOUNCE_THRESHOLD;
    can.isRolling = true;
  };

  const handleRolling = (can, delta) => {
    const currentSpeed = calculateSpeed(can.velocity);

    const friction =
      currentSpeed < PHYSICS_CONSTANTS.SPEED_THRESHOLD
        ? PHYSICS_CONSTANTS.INITIAL_FRICTION
        : PHYSICS_CONSTANTS.HIGH_SPEED_FRICTION;

    can.velocity.x *= friction;
    can.velocity.z *= friction;

    can.rotation.x += currentSpeed * delta;

    if (currentSpeed < PHYSICS_CONSTANTS.STOP_THRESHOLD) {
      stopRolling(can);
    }
  };

  const calculateSpeed = (velocity) => {
    return Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
  };

  const stopRolling = (can) => {
    can.isRolling = false;
    can.velocity.set(0, 0, 0);
    can.rotation.x = Math.round(can.rotation.x / (Math.PI / 2)) * (Math.PI / 2);
  };

  return <primitive ref={modelRef} object={canModel} scale={[1.5, 1.5, 1.5]} />;
};

export const CansContainer = ({ cans }) => {
  return useMemo(
    () => cans.map((can) => <Can key={can.id} initialPosition={can.position} />),
    [cans],
  );
};
