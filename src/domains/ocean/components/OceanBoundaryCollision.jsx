import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

import oceanPlaneUrl from '@/assets/models/oceanPlane.glb';

export const OceanBoundaryCollision = () => {
  const [boundaryConfig, setBoundaryConfig] = useState(null);
  const { nodes } = useGLTF(oceanPlaneUrl);

  useEffect(() => {
    if (nodes.oceanPlane) {
      const bbox = new THREE.Box3().setFromObject(nodes.oceanPlane);
      const size = new THREE.Vector3();
      bbox.getSize(size);

      setBoundaryConfig({
        width: size.x,
        depth: size.z,
        height: 50,
        thickness: 700,
        yOffset: -7.2,
      });
    }
  }, [nodes.oceanPlane]);

  if (!boundaryConfig) return null;

  const { width, depth, height, thickness, yOffset } = boundaryConfig;

  return (
    <group position={[0, yOffset, 0]}>
      <mesh position={[0, height / 2, -depth / 2]} name="collision_boundary_north">
        <boxGeometry args={[width, height, thickness]} />
        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.3} />
      </mesh>

      <mesh position={[0, height / 2, depth / 2]} name="collision_boundary_south">
        <boxGeometry args={[width, height, thickness]} />
        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.3} />
      </mesh>

      <mesh position={[width / 2, height / 2, 0]} name="collision_boundary_east">
        <boxGeometry args={[thickness, height, depth]} />
        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.3} />
      </mesh>

      <mesh position={[-width / 2, height / 2, 0]} name="collision_boundary_west">
        <boxGeometry args={[thickness, height, depth]} />
        <meshBasicMaterial color="#ff0000" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
};
