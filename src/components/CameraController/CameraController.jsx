import { useState, useRef, useEffect, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { CAMERA_CONSTANTS } from '../../constants/constants';
import { isEnterIslandAtom } from '../../utils/atoms';

export default function CameraController({
  cameraRef,
  boatRef,
  rotationAngle,
  verticalRotationAngle,
}) {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const cameraOffset = useRef(
    new THREE.Vector3(
      CAMERA_CONSTANTS.LATERAL_DISTANCE,
      CAMERA_CONSTANTS.HEIGHT,
      -CAMERA_CONSTANTS.DISTANCE,
    ),
  );
  const [islandRotation, setIslandRotation] = useState({ theta: 0, phi: 0 });
  const boatTargetCameraPosition = useRef(new THREE.Vector3());
  const islandCameraPosition = useRef(new THREE.Vector3(-750, 90, -80));
  const prevRotationAngle = useRef(0);
  const prevVerticalRotationAngle = useRef(0);

  const updateIslandRotation = useCallback((deltaTheta, deltaPhi) => {
    setIslandRotation((prev) => ({
      theta: prev.theta + deltaTheta,
      phi: THREE.MathUtils.clamp(prev.phi + deltaPhi, 0.1, Math.PI - 0.1),
    }));
  }, []);

  useEffect(() => {
    if (isEnterIsland) {
      setIslandRotation({ theta: 0, phi: Math.PI / 2 });
    }
  }, [isEnterIsland]);

  useFrame(() => {
    if (cameraRef.current && boatRef.current && !isEnterIsland) {
      const newBoatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(newBoatPosition);

      const rotatedOffset = cameraOffset.current
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationAngle)
        .applyAxisAngle(new THREE.Vector3(1, 0, 0), verticalRotationAngle);

      boatTargetCameraPosition.current.copy(newBoatPosition).add(rotatedOffset);

      cameraRef.current.position.lerp(boatTargetCameraPosition.current, 0.05);
      cameraRef.current.lookAt(newBoatPosition);

      prevRotationAngle.current = rotationAngle;
      prevVerticalRotationAngle.current = verticalRotationAngle;
    }
    if (isEnterIsland) {
      cameraRef.current.position.lerp(new THREE.Vector3(-650, 100, 20), 0.02);

      const deltaTheta = rotationAngle - prevRotationAngle.current;
      const deltaPhi = verticalRotationAngle - prevVerticalRotationAngle.current;

      updateIslandRotation(deltaTheta * 0.05, deltaPhi * 0.05);

      const lookAtPosition = new THREE.Vector3(
        Math.sin(islandRotation.phi) * Math.cos(islandRotation.theta),
        Math.cos(islandRotation.phi),
        Math.sin(islandRotation.phi) * Math.sin(islandRotation.theta),
      ).multiplyScalar(200);

      lookAtPosition.add(islandCameraPosition.current);
      cameraRef.current.lookAt(lookAtPosition);

      prevRotationAngle.current = rotationAngle;
      prevVerticalRotationAngle.current = verticalRotationAngle;
    }
  });

  return null;
}
