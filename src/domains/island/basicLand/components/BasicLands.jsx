import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import basicLand from '@/assets/models/lands.glb';

export const BasicLand = forwardRef((props, ref) => {
  const { scene } = useGLTF(basicLand);

  scene.traverse((child) => {
    child.castShadow = true;
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: '#95d26d',
        metalness: 0.2,
        roughness: 0.7,
      });
    }
  });

  return <primitive object={scene} position={[0, -2.5, 0]} ref={ref} castShadow />;
});

BasicLand.displayName = 'BasicLand';
