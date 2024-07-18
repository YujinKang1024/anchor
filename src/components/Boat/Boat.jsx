import { forwardRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';

import boat from '../../assets/models/boat.glb';
import { isBoatLoadedAtom } from '../../utils/atoms';

const Boat = forwardRef((props, ref) => {
  const [isBoatLoaded, setIsBoatLoaded] = useAtom(isBoatLoadedAtom);
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
    if (!isBoatLoaded) {
      setIsBoatLoaded(true);
    }
  }, [isBoatLoaded, setIsBoatLoaded]);

  return <primitive ref={ref} object={scene} castShadow />;
});

Boat.displayName = 'Boat';

export default Boat;
