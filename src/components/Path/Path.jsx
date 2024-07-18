import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import path from '../../assets/models/path.glb';

export default function Path({ setPathPoints }) {
  const { scene } = useGLTF(path);

  useEffect(() => {
    const line = scene.children.find((child) => child.isLine);

    if (line) {
      line.material = new THREE.LineBasicMaterial({ transparent: true, opacity: 0 });

      line.castShadow = false;
      line.receiveShadow = false;
      line.renderOrder = 1;

      const points = line.geometry.attributes.position.array;
      const pathPoints = [];

      for (let i = 0; i < points.length; i += 3) {
        const x = points[i];
        const y = points[i + 1];
        const z = points[i + 2];
        pathPoints.push(new THREE.Vector3(x, y, z));
      }
      setPathPoints(pathPoints);
    }
  }, [scene, setPathPoints]);

  return <primitive object={scene} position={[0, -400, 0]} />;
}
