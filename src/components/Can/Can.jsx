import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';
import can from '../../assets/models/can.glb';

export default function Can({ position }) {
  const { scene: canScene } = useGLTF(can);
  const [ref, api] = useCylinder(() => ({
    mass: 0.1,
    position,
    rotation: [-Math.PI / 2, 0, -Math.PI / 2],
    args: [2, 2, 8],
    linearDamping: 0.9,
    angularDamping: 0.9,
    restitution: 0.1,
    friction: 0.5,
  }));

  useEffect(() => {
    if (canScene) {
      canScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [canScene]);

  useEffect(() => {
    const vx = (Math.random() - 0.5) * 2;
    const vy = -1;
    const vz = (Math.random() - 0.5) * 2;
    api.velocity.set(vx, vy, vz);
  }, [api]);

  return <primitive object={canScene} ref={ref} scale={[1.5, 1.5, 1.5]} />;
}
