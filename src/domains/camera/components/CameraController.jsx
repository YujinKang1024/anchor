import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { CAMERA_CONSTANTS } from '@/domains/camera/constants/camera.constants';
import { isEnterIslandAtom } from '@/domains/island/atoms';

export const CameraController = ({ cameraRef, boatRef, orbitControlsRef, gameLandRef }) => {
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
  const islandCameraOffset = useRef(new THREE.Vector3(-350, 60, 200));
  const currentZoomDistance = useRef(0);

  useEffect(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enableDamping = true;
      orbitControlsRef.current.dampingFactor = 0.05;
    }

    // 섬의 중심점 계산, 줌 거리 초기화
    if (gameLandRef.current) {
      const boundingBox = new THREE.Box3().setFromObject(gameLandRef.current);

      boundingBox.getCenter(islandCenter.current);
      currentZoomDistance.current = islandCameraOffset.current.length();
    }
  }, [orbitControlsRef, gameLandRef]);

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

        cameraRef.current.position.lerp(newCameraPosition, 0.3);
        orbitControlsRef.current.target.lerp(boatPosition, 0.3);

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
        const currentDistance = currentOffset.length();

        currentZoomDistance.current = currentDistance;

        const targetPosition = islandCenter.current
          .clone()
          .add(currentOffset.normalize().multiplyScalar(currentZoomDistance.current));

        cameraRef.current.position.lerp(targetPosition, 0.05);
        orbitControlsRef.current.target.copy(islandCenter.current);
      }

      orbitControlsRef.current.update();
    }
  });

  return null;
};
