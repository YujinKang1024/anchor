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
