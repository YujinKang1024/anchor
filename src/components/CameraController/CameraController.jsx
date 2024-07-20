import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { isScrollingAtom } from '../../utils/atoms';
import { CAMERA_CONSTANTS } from '../../constants/constants';

export default function CameraController({ cameraRef, boatRef, rotationAngle }) {
  const [isScrolling] = useAtom(isScrollingAtom);
  const [isCameraPositionInitialized, setIsCameraPositionInitialized] = useState(false);

  const cameraOffset = useRef(new THREE.Vector3(20, CAMERA_CONSTANTS.HEIGHT, 100));

  useEffect(() => {
    if (!isCameraPositionInitialized && cameraRef.current && boatRef.current) {
      const boatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(boatPosition);

      const targetCameraPosition = boatPosition.clone().add(cameraOffset.current);

      cameraRef.current.position.copy(targetCameraPosition);
      cameraRef.current.lookAt(boatPosition);

      setIsCameraPositionInitialized(true);
    }
  }, [cameraRef, boatRef, isCameraPositionInitialized, setIsCameraPositionInitialized]);

  useFrame(() => {
    if (cameraRef.current && boatRef.current) {
      const newBoatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(newBoatPosition);

      let targetCameraPosition;
      if (isScrolling) {
        targetCameraPosition = newBoatPosition.clone().add(cameraOffset.current);
      } else {
        const x = newBoatPosition.x + CAMERA_CONSTANTS.DISTANCE * Math.sin(rotationAngle);
        const z = newBoatPosition.z + CAMERA_CONSTANTS.DISTANCE * Math.cos(rotationAngle);
        targetCameraPosition = new THREE.Vector3(x, CAMERA_CONSTANTS.HEIGHT, z);
      }

      cameraRef.current.position.set(
        targetCameraPosition.x,
        CAMERA_CONSTANTS.HEIGHT,
        targetCameraPosition.z,
      );
      cameraRef.current.lookAt(newBoatPosition);
    }
  });

  return null;
}
