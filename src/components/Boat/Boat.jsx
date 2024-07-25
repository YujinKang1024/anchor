import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';

import boat from '../../assets/models/boat.glb';

const Boat = forwardRef((props, ref) => {
  const { scene } = useGLTF(boat);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive ref={ref} object={scene} />;
});

Boat.displayName = 'Boat';

export default Boat;
