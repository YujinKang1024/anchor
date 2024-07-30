import { useCallback, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import gameVendingMachine from '../../assets/models/gameLand-vendingMachine.glb';
import { isEnterIslandAtom, isLandMenuOpenAtom } from '../../utils/atoms';
import { EMISSION_COLOR_MAP } from '../../constants/colorMapConstants';

export default function GameLandVendingMachine({ onClick }) {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const { scene: vendingMachineScene } = useGLTF(gameVendingMachine);

  useEffect(() => {
    vendingMachineScene.traverse((child) => {
      if (child.isMesh && child.name in EMISSION_COLOR_MAP) {
        child.castShadow = true;
        child.receiveShadow = true;

        const { color, intensity } = EMISSION_COLOR_MAP[child.name];
        child.material.emissive = new THREE.Color(color);
        child.material.emissiveIntensity = intensity;
      }
    });
  }, [vendingMachineScene]);

  const handleClick = useCallback(
    (event) => {
      if (!isEnterIsland || isLandMenuOpen) return;

      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }
    },
    [onClick, isEnterIsland, isLandMenuOpen],
  );

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'default';
  }, []);

  const handlePointerOver = useCallback(() => {
    if (isEnterIsland && !isLandMenuOpen) {
      document.body.style.cursor = 'pointer';
    }
  }, [isEnterIsland, isLandMenuOpen]);

  return (
    <group scale={[1, 1, 1]} position={[0, 0, 0]}>
      <mesh
        onPointerDown={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={vendingMachineScene} />
      </mesh>
    </group>
  );
}
