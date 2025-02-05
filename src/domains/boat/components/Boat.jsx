import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

import { BOAT_CONSTANTS } from '@/domains/boat/constants/boat.constants';

import boat from '@/assets/models/boat.glb';

export const Boat = forwardRef((props, ref) => {
  const { scene } = useGLTF(boat);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive ref={ref} object={scene} rotation={[0, BOAT_CONSTANTS.INITIAL_BOAT_ROTATION, 0]} />
  );
});

Boat.displayName = 'Boat';
