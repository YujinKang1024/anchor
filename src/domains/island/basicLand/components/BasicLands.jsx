import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

import basicLand from '@/assets/models/lands.glb';

export const BasicLand = forwardRef((props, ref) => {
  const { scene } = useGLTF(basicLand);

  scene.traverse((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

  return <primitive object={scene} position={[0, -2.5, 0]} ref={ref} castShadow receiveShadow />;
});

BasicLand.displayName = 'BasicLand';
