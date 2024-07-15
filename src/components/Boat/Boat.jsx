import { forwardRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import boat from '../../assets/models/boat.glb';

const Boat = forwardRef(({ onLoaded }, ref) => {
  const { scene } = useGLTF(boat);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: '#eee',
        metalness: 0.1,
        roughness: 0.3,
      });
    }
  });

  useEffect(() => {
    if (onLoaded) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[780, -500.5, 520]}
      rotation={[0, 0.8, 0]}
    />
  );
});

Boat.displayName = 'Boat';

export default Boat;
