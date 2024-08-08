import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { CAMERA_CONSTANTS } from '../../constants/constants';
import { isEnterIslandAtom } from '../../utils/atoms';

export default function CameraController({ cameraRef, boatRef, orbitControlsRef, developLandRef }) {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const cameraOffset = useRef(
    new THREE.Vector3(
      CAMERA_CONSTANTS.LATERAL_DISTANCE,
      CAMERA_CONSTANTS.HEIGHT,
      -CAMERA_CONSTANTS.DISTANCE,
    ),
  );
  const lastBoatPosition = useRef(new THREE.Vector3());
  const transitionStarted = useRef(false);
  const transitionProgress = useRef(0);
  const islandCenter = useRef(new THREE.Vector3());
  const islandCameraOffset = useRef(new THREE.Vector3(500, 300, 500));

  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enableDamping = true;
      orbitControlsRef.current.dampingFactor = 0.05;
    }

    // 섬의 중심점 계산
    if (developLandRef.current) {
      const boundingBox = new THREE.Box3().setFromObject(developLandRef.current);
      boundingBox.getCenter(islandCenter.current);
    }
  }, [orbitControlsRef, developLandRef]);

  useEffect(() => {
    if (isEnterIsland) {
      transitionStarted.current = true;
      transitionProgress.current = 0;
    } else {
      transitionStarted.current = false;
    }
  }, [isEnterIsland]);

  useFrame(() => {
    if (cameraRef.current && boatRef.current && orbitControlsRef.current) {
      const boatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(boatPosition);

      if (!isEnterIsland) {
        const spherical = new THREE.Spherical().setFromVector3(
          cameraRef.current.position.clone().sub(orbitControlsRef.current.target),
        );

        const rotatedOffset = new THREE.Vector3().setFromSpherical(spherical);
        const newCameraPosition = boatPosition.clone().add(rotatedOffset);

        cameraRef.current.position.lerp(newCameraPosition, 0.5);
        orbitControlsRef.current.target.lerp(boatPosition, 0.5);

        lastBoatPosition.current.copy(boatPosition);
      } else if (transitionStarted.current) {
        // 섬 모드 전환
        transitionProgress.current += 0.01;
        if (transitionProgress.current > 1) {
          transitionProgress.current = 1;
          transitionStarted.current = false;
        }

        const startPosition = lastBoatPosition.current.clone().add(cameraOffset.current);
        const targetPosition = islandCenter.current.clone().add(islandCameraOffset.current);

        cameraRef.current.position.lerpVectors(
          startPosition,
          targetPosition,
          transitionProgress.current,
        );

        cameraRef.current.lookAt(islandCenter.current);
        orbitControlsRef.current.target.copy(islandCenter.current);
      } else {
        // 섬 모드에서의 카메라 제어
        const currentOffset = cameraRef.current.position.clone().sub(islandCenter.current);
        const distance = currentOffset.length();
        currentOffset
          .normalize()
          .multiplyScalar(Math.max(distance, islandCameraOffset.current.length()));
        const targetPosition = islandCenter.current.clone().add(currentOffset);

        cameraRef.current.position.lerp(targetPosition, 0.05);
        orbitControlsRef.current.target.copy(islandCenter.current);
      }

      orbitControlsRef.current.update();
    }
  });

  return null;
}
