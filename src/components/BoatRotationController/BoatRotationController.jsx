import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { targetRotationAtom } from '../../utils/atoms';

export default function BoatRotationController({ boatRef }) {
  const [targetRotation] = useAtom(targetRotationAtom);

  useFrame(() => {
    if (boatRef.current) {
      const currentRotation = boatRef.current.rotation.y;
      let deltaRotation = targetRotation - currentRotation;

      deltaRotation = ((deltaRotation + Math.PI) % (2 * Math.PI)) - Math.PI;

      boatRef.current.rotation.y = THREE.MathUtils.lerp(
        currentRotation,
        currentRotation + deltaRotation,
        0.01,
      );
    }
  });

  return null;
}
