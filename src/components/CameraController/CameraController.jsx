import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { isScrollingAtom } from '../../utils/atoms';

export default function CameraController({ cameraRef, boatRef, rotationAngle }) {
  const [isScrolling] = useAtom(isScrollingAtom);
  const [isCameraPositionInitialized, setIsCameraPositionInitialized] = useState(false);
  const cameraDistance = 110;
  const cameraHeight = -450;
  const cameraOffset = useRef(new THREE.Vector3(20, cameraHeight, 110));

  useEffect(() => {
    if (!isCameraPositionInitialized && cameraRef.current && boatRef.current) {
      const boatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(boatPosition);

      const targetCameraPosition = boatPosition.clone().add(cameraOffset.current);

      cameraRef.current.position.copy(targetCameraPosition);
      cameraRef.current.lookAt(boatPosition);

      setIsCameraPositionInitialized(true);
    }
  }, [
    cameraRef,
    boatRef,
    isCameraPositionInitialized,
    cameraHeight,
    setIsCameraPositionInitialized,
  ]);

  useFrame(() => {
    if (cameraRef.current && boatRef.current) {
      const boatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(boatPosition);

      let targetCameraPosition;
      if (isScrolling) {
        targetCameraPosition = boatPosition.clone().add(cameraOffset.current);
      } else {
        const x = boatPosition.x + cameraDistance * Math.sin(rotationAngle);
        const z = boatPosition.z + cameraDistance * Math.cos(rotationAngle);
        targetCameraPosition = new THREE.Vector3(x, cameraHeight, z);
      }

      cameraRef.current.position.set(targetCameraPosition.x, cameraHeight, targetCameraPosition.z);
      cameraRef.current.lookAt(boatPosition);
    }
  });

  return null;
}
