import { useCallback, useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import * as THREE from 'three';
import { Physics, useBox, usePlane } from '@react-three/cannon';

import { EMISSION_COLOR_MAP } from '@/shared/constants';
import { isEnterIslandAtom } from '@/domains/island/atoms/playerStateAtoms';
import { isLandMenuOpenAtom, isShowSoldOutMessageAtom } from '@/atoms';

import { Can } from './Can';

import gameVendingMachine from '@/assets/models/gameLand-vendingMachine.glb';

const VendingMachineBody = ({ onClick, onPointerOver, onPointerOut }) => {
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
};

const GameLandFloor = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [-390, 4.5, -290],
    type: 'Static',
    restitution: 0.1,
    friction: 0.8,
  }));

  return (
    <mesh ref={ref}>
      <planeGeometry args={[400, 300]} />
      <meshStandardMaterial visible={false} />
    </mesh>
  );
};

const GameLandVendingMachineContent = ({ onClick }) => {
  const [isEnterIsland] = useAtom(isEnterIslandAtom);
  const [isLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [, setIsShowSoldOutMessage] = useAtom(isShowSoldOutMessageAtom);
  const [cans, setCans] = useState([]);

  const handleClick = useCallback(
    (event) => {
      if (!isEnterIsland || isLandMenuOpen) return;

      event.stopPropagation();
      if (onClick) {
        onClick(event);
      }

      if (cans.length < 5) {
        setCans((prevCans) => [
          ...prevCans,
          {
            id: Date.now(),
            position: [
              -480 + (Math.random() - 0.5) * 2,
              10 + prevCans.length,
              -420 + (Math.random() - 0.5) * 2,
            ],
          },
        ]);
      } else {
        setIsShowSoldOutMessage(true);
        setTimeout(() => setIsShowSoldOutMessage(false), 2000);
      }
    },
    [onClick, isEnterIsland, isLandMenuOpen, cans.length, setIsShowSoldOutMessage],
  );

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'default';
  }, []);

  const handlePointerOver = useCallback(() => {
    if (isEnterIsland && !isLandMenuOpen) {
      document.body.style.cursor = 'pointer';
    }
  }, [isEnterIsland, isLandMenuOpen]);

  const canElements = useMemo(() => {
    return cans.map((can) => <Can key={can.id} initialPosition={can.position} />);
  }, [cans]);

  return (
    <>
      <VendingMachineBody
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      {canElements}
      <GameLandFloor />
    </>
  );
};

export const GameLandVendingMachine = ({ onClick }) => {
  return (
    <Physics>
      <GameLandVendingMachineContent onClick={onClick} />
    </Physics>
  );
};
