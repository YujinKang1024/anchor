import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { isOnBattleAtom } from '@/domains/island/atoms/playerStateAtoms';
import { EMISSION_COLOR_MAP } from '@/shared/constants';

import gameBattleSign from '@/assets/models/gameLand-battleSign.glb';

export const GameLandBattleSign = ({ isGlowing }) => {
  const [isOnBattle] = useAtom(isOnBattleAtom);

  const { scene: battleSignScene } = useGLTF(gameBattleSign);

  const wholeSignRef = useRef();
  const floatingSignRef = useRef();
  const glowingSignRef = useRef();
  const currentIntensityRef = useRef(0);

  useEffect(() => {
    if (wholeSignRef.current) {
      wholeSignRef.current.traverse((child) => {
        if (child.isMesh) {
          if (child.name in EMISSION_COLOR_MAP) {
            child.castShadow = true;
            child.receiveShadow = true;

            const { color } = EMISSION_COLOR_MAP[child.name];
            child.material.emissive = new THREE.Color(color);
          }
          if (child.name === 'game_battle_machine_sign01') {
            floatingSignRef.current = child;
          }
          if (child.name === 'game_battle_machine_sign02') {
            glowingSignRef.current = {
              mesh: child,
              initialPosition: child.position.clone(),
            };
          }
        }
      });
    }
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (wholeSignRef.current) {
      wholeSignRef.current.traverse((child) => {
        if (child.isMesh && child.name in EMISSION_COLOR_MAP) {
          const { intensity } = EMISSION_COLOR_MAP[child.name];

          let targetIntensity;
          if (isOnBattle) {
            const blinkFactor = (Math.sin(time * 10) + 3) / 2;
            targetIntensity = intensity * (0.1 + blinkFactor);
          } else {
            targetIntensity = isGlowing ? intensity : 0;
          }
          currentIntensityRef.current += (targetIntensity - currentIntensityRef.current) * 0.1;
          child.material.emissiveIntensity = currentIntensityRef.current;
        }
      });
    }

    if (floatingSignRef.current && !isOnBattle) {
      const time = clock.getElapsedTime();
      const floatHeight = Math.sin(time * 2.5) * 0.2;

      floatingSignRef.current.position.y = floatingSignRef.current.position.y + floatHeight;
    }
    if (glowingSignRef.current) {
      const targetY =
        isGlowing || isOnBattle
          ? glowingSignRef.current.initialPosition.y + 10
          : glowingSignRef.current.initialPosition.y;

      glowingSignRef.current.mesh.position.y +=
        (targetY - glowingSignRef.current.mesh.position.y) * 0.1;
    }
  });

  return <primitive object={battleSignScene} ref={wholeSignRef} />;
};
