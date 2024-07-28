import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { CAMERA_CONSTANTS } from '../../constants/constants';

export default function CameraController({ cameraRef, boatRef, rotationAngle }) {
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

      cameraRef.current.position.lerp(targetCameraPosition.current, 0.09);
      cameraRef.current.lookAt(newBoatPosition);
    }
  });

  return null;
}
