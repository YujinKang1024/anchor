import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function useFollowBoat(cameraRef, boatRef, controlsRef) {
  useFrame(() => {
    if (cameraRef.current && boatRef.current && controlsRef.current) {
      const boatPosition = new THREE.Vector3();
      boatRef.current.getWorldPosition(boatPosition);

      const fixedY = -450;

      const targetCameraPosition = new THREE.Vector3(
        boatPosition.x + 20,
        fixedY,
        boatPosition.z + 110,
      );

      cameraRef.current.position.lerp(targetCameraPosition, 0.1);

      controlsRef.current.target.lerp(boatPosition, 0.1);
      controlsRef.current.update();
    }
  });
}
