import { useEffect, useRef, useCallback, useState, forwardRef } from 'react';
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { PLAYER_MAX_HP } from '@/domains/island/gameLand';
import { EMISSION_COLOR_MAP } from '@/shared/constants';

import { isLandMenuOpenAtom } from '@/atoms';
import {
  isEnterIslandAtom,
  isOnBattleAtom,
  playerHPAtom,
  monsterHPAtom,
} from '@/domains/island/atoms';

import { Monster } from '@/domains/island/gameLand/battle';
import {
  GameLandBattleMachine,
  GameLandVendingMachine,
  GameLandBattleSign,
} from '@/domains/island/gameLand/object';

import gameLand from '@/assets/models/gameLand.glb';

export const GameLand = forwardRef((props, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [signIntensity, setSignIntensity] = useState(5.0);
  const [isBlinking, setIsBlinking] = useState(false);

  const [isLandMenuOpen, setIsLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [isBattleMachineHovered, setIsBattleMachineHovered] = useState(false);
  const [isEnterIsland, setIsEnterIsland] = useAtom(isEnterIslandAtom);
  const [isOnBattle, setIsOnBattle] = useAtom(isOnBattleAtom);
  const [playerHP, setPlayerHP] = useAtom(playerHPAtom);
  const [, setMonsterHP] = useAtom(monsterHPAtom);
  const { scene } = useGLTF(gameLand);
  const glowMeshesRef = useRef([]);
  const battleMachineRef = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.name in EMISSION_COLOR_MAP) {
            const { color, intensity } = EMISSION_COLOR_MAP[child.name];

            child.material.emissive = new THREE.Color(color);
            child.material.emissiveIntensity = intensity * 0.5;
          }
        }
      });
    }
  }, [ref]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 800);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (isBlinking) {
      const blinkEffect = setInterval(() => {
        setSignIntensity(() => Math.random() * 22 + 10);
      }, 100);

      return () => clearInterval(blinkEffect);
    } else {
      setSignIntensity(28.0);
    }
  }, [isBlinking]);

  useFrame(({ camera }) => {
    glowMeshesRef.current.forEach((mesh) => {
      mesh.material.uniforms.viewVector.value.copy(camera.position).sub(mesh.position);

      if (mesh.name === 'game_sign_emission') {
        mesh.material.uniforms.glowColor.value.setRGB(0.5, 0, 1);
        mesh.material.uniforms.coefficient.value = signIntensity;
      }
    });

    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh && child.name === 'game_sign_emission') {
          child.material.emissiveIntensity = signIntensity * 0.1;
        }
      });
    }
  });

  const handleBattleMachineClick = useCallback(() => {
    if (!isOnBattle && isEnterIsland && !isLandMenuOpen) {
      setIsOnBattle(true);
    }
  }, [isOnBattle, setIsOnBattle, isEnterIsland, isLandMenuOpen]);

  const handleBattleMachinePointerOver = useCallback(() => {
    if (isEnterIsland && !isOnBattle && !isLandMenuOpen) {
      document.body.style.cursor = 'pointer';
      setIsBattleMachineHovered(true);
    }
  }, [isEnterIsland, isOnBattle, isLandMenuOpen]);

  const handleBattleMachinePointerOut = useCallback(() => {
    document.body.style.cursor = 'default';
    setIsBattleMachineHovered(false);
  }, []);

  const handleMouseMove = useCallback((event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handlePlayerDamage = useCallback(
    (damage) => {
      setPlayerHP((prevHP) => {
        const newHP = Math.max(prevHP - damage, 0);
        if (newHP === 0) {
          setTimeout(() => {
            setIsEnterIsland(false);
            setIsOnBattle(false);
            setIsLandMenuOpen(false);
            setMonsterHP(100);
          }, 1000);

          return 0;
        }
        return newHP;
      });
    },
    [setPlayerHP, setIsEnterIsland, setIsOnBattle, setIsLandMenuOpen, setMonsterHP],
  );

  useEffect(() => {
    if (playerHP === 0) {
      const timer = setTimeout(() => {
        setPlayerHP(PLAYER_MAX_HP);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [playerHP, setPlayerHP]);

  return (
    <>
      <primitive object={scene} ref={ref} />
      <GameLandBattleMachine
        ref={battleMachineRef}
        onClick={handleBattleMachineClick}
        onPointerOver={handleBattleMachinePointerOver}
        onPointerOut={handleBattleMachinePointerOut}
      />
      <GameLandVendingMachine />
      <GameLandBattleSign isGlowing={isBattleMachineHovered} />
      <Monster
        position={[-400, 40, -370]}
        onAttack={() => handlePlayerDamage(10)}
        mousePosition={mousePosition}
      />
    </>
  );
});

GameLand.displayName = 'GameLand';
