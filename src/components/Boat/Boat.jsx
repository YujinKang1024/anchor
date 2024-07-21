import { forwardRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import boat from '../../assets/models/boat.glb';

const Boat = forwardRef((props, ref) => {
  const { scene } = useGLTF(boat);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.material = new THREE.MeshStandardMaterial({
        color: '#eee',
        metalness: 0.1,
        roughness: 0.3,
      });
    }
  });

  return <primitive ref={ref} object={scene} castShadow />;
});

Boat.displayName = 'Boat';

export default Boat;
