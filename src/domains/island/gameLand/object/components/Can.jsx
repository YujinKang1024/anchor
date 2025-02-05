import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useCylinder } from '@react-three/cannon';

import can from '@/assets/models/can.glb';

export const Can = ({ initialPosition }) => {
  const { scene: canScene } = useGLTF(can);
  const [ref, api] = useCylinder(() => ({
    mass: 1,
    position: initialPosition,
    rotation: [-Math.PI / 2, 0, -Math.PI / 2],
    args: [1, 1, 4],
    linearDamping: 0.1,
    angularDamping: 0.7,
    friction: 0.8,
  }));

  const positionRef = useRef(initialPosition);

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
    const unsubscribe = api.position.subscribe((v) => {
      positionRef.current = v;
    });

    return unsubscribe;
  }, [api.position]);

  useEffect(() => {
    const checkPosition = setInterval(() => {
      if (positionRef.current[1] < -10) {
        api.position.set(initialPosition[0], initialPosition[1], initialPosition[2]);
        api.velocity.set(0, -1, 0);
      }
    }, 100);

    return () => clearInterval(checkPosition);
  }, [api, initialPosition]);

  useEffect(() => {
    const vx = (Math.random() - 0.5) * 1;
    const vy = -10;
    const vz = (Math.random() - 0.5) * 1;
    api.velocity.set(vx, vy, vz);
  }, [api]);

  return <primitive object={canScene} ref={ref} scale={[1.5, 1.5, 1.5]} />;
};
