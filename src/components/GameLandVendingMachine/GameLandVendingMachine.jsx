import { useCallback, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import * as THREE from 'three';
import { Physics, useBox, usePlane } from '@react-three/cannon';

import gameVendingMachine from '../../assets/models/gameLand-vendingMachine.glb';
import { isEnterIslandAtom, isLandMenuOpenAtom } from '../../utils/atoms';
import { EMISSION_COLOR_MAP } from '../../constants/colorMapConstants';
import Can from '../Can/Can';

function VendingMachineBody({ onClick, onPointerOver, onPointerOut }) {
  const { scene: vendingMachineScene } = useGLTF(gameVendingMachine);
  const [ref] = useBox(() => ({
    mass: 0,
    position: [-480, 10, -433],
    args: [50, 110, 30],
  }));

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

  return (
    <>
      <mesh
        ref={ref}
        onPointerDown={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <boxGeometry args={[50, 110, 30]} />
        <meshStandardMaterial color="lightblue" visible={false} />
      </mesh>
      <primitive object={vendingMachineScene} />
    </>
  );
}

function GameLandFloor() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [-390, 4.0, -290],
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[400, 300]} />
      <meshStandardMaterial visible={false} />
    </mesh>
  );
}

export default function GameLandVendingMachine({ onClick }) {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [showCan, setShowCan] = useState(false);

  const handleClick = useCallback(
    (event) => {
      if (!isEnterIsland || isLandMenuOpen) return;

      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }

      setShowCan(true);
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
    <Physics>
      <VendingMachineBody
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      {showCan && <Can position={[-480, 10, -420]} />}
      <GameLandFloor />
    </Physics>
  );
}
