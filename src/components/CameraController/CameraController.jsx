import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { isScrollingAtom } from '../../utils/atoms';
import { CAMERA_CONSTANTS } from '../../constants/constants';

export default function CameraController({ cameraRef, boatRef, rotationAngle }) {
  const [isScrolling] = useAtom(isScrollingAtom);

  const cameraOffset = useRef(
    new THREE.Vector3(
      CAMERA_CONSTANTS.LATERAL_DISTANCE,
      CAMERA_CONSTANTS.HEIGHT,
      -CAMERA_CONSTANTS.DISTANCE,
    ),
  );
  const targetCameraPosition = useRef(new THREE.Vector3());

  useFrame(() => {
    if (cameraRef.current && boatRef.current) {
      const newBoatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(newBoatPosition);

      const rotatedOffset = cameraOffset.current
        .clone()
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationAngle);

      targetCameraPosition.current.copy(newBoatPosition).add(rotatedOffset);

      const lerpFactor = isScrolling ? 0.1 : 0.05;

      cameraRef.current.position.lerp(targetCameraPosition.current, lerpFactor);
      cameraRef.current.lookAt(newBoatPosition);
    }
  });

  return null;
}
