import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { BOAT_CONSTANTS } from '@/domains/boat/constants/boat.constants';

import { boatPositionAtom, boatRotationAtom } from '@/domains/boat/atoms/boatAtoms';
import { isEnterIslandAtom } from '@/domains/island/atoms/playerStateAtoms';

import { useBoatControl } from '@/domains/boat/hooks/useBoatControl';

export const BoatController = ({ boatRef }) => {
  const [boatPosition] = useAtom(boatPositionAtom);
  const [boatRotation] = useAtom(boatRotationAtom);
  const [isEnterIsland] = useAtom(isEnterIslandAtom);

  const targetPosition = useRef(new THREE.Vector3());
  const targetRotation = useRef(new THREE.Euler());

  useBoatControl();

  useFrame(() => {
    if (boatRef.current && !isEnterIsland) {
      targetPosition.current.set(boatPosition.x, boatPosition.y, boatPosition.z);
      boatRef.current.position.lerp(targetPosition.current, BOAT_CONSTANTS.MOVE_SPEED);

      targetRotation.current.set(0, boatRotation + BOAT_CONSTANTS.INITIAL_BOAT_ROTATION, 0);
      boatRef.current.rotation.y = THREE.MathUtils.lerp(
        boatRef.current.rotation.y,
        targetRotation.current.y,
        BOAT_CONSTANTS.ROTATION_SPEED,
      );
    }
  });

  return null;
};
