import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import basicLand from '@/assets/models/lands.glb';

export const LandCollisionMesh = () => {
  const [collisionMeshes, setCollisionMeshes] = useState([]);
  const { scene } = useGLTF(basicLand);

  useEffect(() => {
    const meshes = [];

    scene.traverse((child) => {
      if (child.isMesh && (child.name.includes('land') || child.name.includes('Land'))) {
        const bbox = new THREE.Box3().setFromObject(child);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        bbox.getSize(size);
        bbox.getCenter(center);

        meshes.push({
          radius: Math.max(size.x, size.z) * 0.5,
          height: size.y + 4,
          position: [center.x, center.y - 2.5, center.z],
          name: `collision_${child.name}`,
        });
      }
    });

    setCollisionMeshes(meshes);
  }, [scene]);

  return (
    <>
      {collisionMeshes.map((mesh, index) => (
        <mesh key={index} position={mesh.position} name={mesh.name}>
          <cylinderGeometry args={[mesh.radius, mesh.radius, mesh.height, 32]} />
          <meshStandardMaterial color="#ff0000" wireframe={true} transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
};
