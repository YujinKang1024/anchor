import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { BOAT_CONSTANTS } from '@/domains/boat/constants/boat.constants';
import { boatStateAtom } from '@/domains/boat/atoms';

import { calculateSimplifiedWaveHeight } from '@/domains/boat/utils/boatUtils';

export const BoatFloatingAnimation = ({ boatRef }) => {
  const [boatState] = useAtom(boatStateAtom);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (boatRef.current) {
      const currentPosition = boatRef.current.position;
      timeRef.current += delta * (boatState.isMoving ? 0.4 : 1);

      const waveHeight = calculateSimplifiedWaveHeight(
        currentPosition.x,
        currentPosition.z,
        timeRef.current,
      );

      if (!boatState.isMoving) {
        const targetY = BOAT_CONSTANTS.INITIAL_BOAT_POSITION.y + waveHeight;
        boatRef.current.position.y = THREE.MathUtils.lerp(boatRef.current.position.y, targetY, 0.1);
      }

      const targetRotationX = Math.sin(timeRef.current * 1.5) * 0.02;
      const targetRotationZ = Math.sin(timeRef.current * 1.2) * 0.02;

      boatRef.current.rotation.x = THREE.MathUtils.lerp(
        boatRef.current.rotation.x,
        targetRotationX,
        0.1,
      );
      boatRef.current.rotation.z = THREE.MathUtils.lerp(
        boatRef.current.rotation.z,
        targetRotationZ,
        0.1,
      );
    }
  });

  return null;
};
