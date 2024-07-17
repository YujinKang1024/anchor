import { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { isScrollingAtom } from '../utils/atoms';

export default function useFollowBoat(cameraRef, boatRef, controlsRef) {
  const [isScrolling] = useAtom(isScrollingAtom);
  const [isCameraPositionInitialized, setIsCameraPositionInitialized] = useState(false);

  useEffect(() => {
    if (
      !isCameraPositionInitialized &&
      cameraRef.current &&
      boatRef.current &&
      controlsRef.current
    ) {
      const boatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(boatPosition);

      const fixedY = -450;

      const targetCameraPosition = new THREE.Vector3(
        boatPosition.x + 20,
        fixedY,
        boatPosition.z + 110,
      );

      cameraRef.current.position.set(
        targetCameraPosition.x,
        targetCameraPosition.y,
        targetCameraPosition.z,
      );

      controlsRef.current.target.set(boatPosition.x, boatPosition.y, boatPosition.z);
      controlsRef.current.update();

      setIsCameraPositionInitialized(true);
    }
  }, [
    cameraRef,
    boatRef,
    controlsRef,
    isCameraPositionInitialized,
    setIsCameraPositionInitialized,
  ]);

  useFrame(() => {
    if (
      isScrolling &&
      isCameraPositionInitialized &&
      cameraRef.current &&
      boatRef.current &&
      controlsRef.current
    ) {
      const boatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(boatPosition);

      const fixedY = -450;

      const targetCameraPosition = new THREE.Vector3(
        boatPosition.x + 20,
        fixedY,
        boatPosition.z + 110,
      );

      cameraRef.current.position.set(
        targetCameraPosition.x,
        targetCameraPosition.y,
        targetCameraPosition.z,
      );

      controlsRef.current.target.set(boatPosition.x, boatPosition.y, boatPosition.z);
      controlsRef.current.update();
    }
  });
}
