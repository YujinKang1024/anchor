import { useCallback, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { EMISSION_COLOR_MAP } from '@/shared/constants';
import { isEnterIslandAtom } from '@/domains/island/atoms/playerStateAtoms';
import { isLandMenuOpenAtom, isShowSoldOutMessageAtom } from '@/atoms';

import { CansContainer, GameLandFloor } from '@/domains/island/gameLand';

import gameVendingMachine from '@/assets/models/gameLand-vendingMachine.glb';

const VendingMachineBody = ({ onClick, onPointerOver, onPointerOut }) => {
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

  return (
    <>
      <mesh
        position={[-480, 10, -433]}
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
};

const GameLandVendingMachineContent = () => {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [, setIsShowSoldOutMessage] = useAtom(isShowSoldOutMessageAtom);
  const [cans, setCans] = useState([]);

  const handleClick = useCallback(
    (event) => {
      if (!isEnterIsland || isLandMenuOpen) return;

      event.stopPropagation();

      if (cans.length < 5) {
        const newCan = {
          id: Date.now(),
          position: [
            -490 + (Math.random() - 0.5) * 25,
            10 + Math.random() * 2,
            -420 + (Math.random() + 0.5) * 20,
          ],
        };

        setCans((prevCans) => [...prevCans, newCan]);
      } else {
        setIsShowSoldOutMessage(true);
        setTimeout(() => setIsShowSoldOutMessage(false), 2000);
      }
    },
    [isEnterIsland, isLandMenuOpen, cans.length, setIsShowSoldOutMessage],
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
    <>
      <VendingMachineBody
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      <CansContainer cans={cans} />
    </>
  );
};

export const GameLandVendingMachine = () => {
  return (
    <>
      <GameLandFloor />
      <GameLandVendingMachineContent />
    </>
  );
};
