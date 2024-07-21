import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import lands from '../../assets/models/lands.glb';

export default function Lands() {
  const { scene } = useGLTF(lands);

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

  return <primitive object={scene} position={[0, -2.5, 0]} castShadow />;
}
