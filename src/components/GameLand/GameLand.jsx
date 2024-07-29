import { useEffect, useRef, useCallback, useState } from 'react';
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import { isEnterIslandAtom, isOnBattleAtom, playerHPAtom } from '../../utils/atoms';
import gameLand from '../../assets/models/gameLand.glb';

import Monster from '../Monster/Monster';
import GameLandBattleMachine from '../GameLandBattleMachine/GameLandBattleMachine';
import GameLandVendingMachine from '../GameLandVendingMachine/GameLandVendingMachine';
import GameLandBattleSign from '../GameLandBattleSign/GameLandBattleSign';
import MouseFollower from '../MouseFollower/MouseFollower';

import { createGlowMesh } from '../../materials/GlowShaderMaterial';
import { PLAYER_MAX_HP } from '../../constants/constants';
import { EMISSION_COLOR_MAP } from '../../constants/colorMapConstants';

export default function GameLand() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isBattleMachineHovered, setIsBattleMachineHovered] = useState(false);
  const [isEnterIsland, setIsEnterIsland] = useAtom(isEnterIslandAtom);
  const [isOnBattle, setIsOnBattle] = useAtom(isOnBattleAtom);
  const [playerHP, setPlayerHP] = useAtom(playerHPAtom);
  const { scene } = useGLTF(gameLand);
  const glowMeshesRef = useRef([]);
  const mouseFollowerRef = useRef(null);
  const battleMachineRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.name in EMISSION_COLOR_MAP) {
            const { color, intensity } = EMISSION_COLOR_MAP[child.name];

            child.material.emissive = new THREE.Color(color);
            child.material.emissiveIntensity = intensity * 0.5;

            const glowMesh = createGlowMesh(child, color, intensity);
            child.parent.add(glowMesh);
            glowMeshesRef.current.push(glowMesh);
          }
        }
      });
    }
  }, [scene]);

  const cleanup = useCallback(() => {
    glowMeshesRef.current.forEach((mesh) => {
      if (mesh.parent) mesh.parent.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    glowMeshesRef.current = [];
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useFrame(({ camera }) => {
    glowMeshesRef.current.forEach((mesh) => {
      mesh.material.uniforms.viewVector.value.copy(camera.position).sub(mesh.position);
    });
  });

  const handleBattleMachineClick = useCallback(() => {
    if (!isOnBattle && isEnterIsland) {
      setIsOnBattle(true);
    }
  }, [isOnBattle, setIsOnBattle, isEnterIsland]);

  const handleBattleMachinePointerOver = useCallback(() => {
    if (isEnterIsland && !isOnBattle) {
      document.body.style.cursor = 'pointer';
      setIsBattleMachineHovered(true);
    }
  }, [isEnterIsland, isOnBattle]);

  const handleBattleMachinePointerOut = useCallback(() => {
    document.body.style.cursor = 'default';
    setIsBattleMachineHovered(false);
  }, []);

  const handleVendingMachineClick = useCallback(() => {
    console.log('자판기 클릭!');
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
          setIsEnterIsland(false);
          setIsOnBattle(false);
          return 0;
        }
        return newHP;
      });
    },
    [setPlayerHP, setIsEnterIsland, setIsOnBattle],
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
      <primitive object={scene} ref={sceneRef} />
      <GameLandBattleMachine
        ref={battleMachineRef}
        onClick={handleBattleMachineClick}
        onPointerOver={handleBattleMachinePointerOver}
        onPointerOut={handleBattleMachinePointerOut}
      />
      <GameLandVendingMachine onClick={handleVendingMachineClick} />
      <GameLandBattleSign isGlowing={isBattleMachineHovered} />
      <Monster position={[-400, 40, -370]} onAttack={() => handlePlayerDamage(10)} />
      {isOnBattle && mousePosition && (
        <MouseFollower
          ref={mouseFollowerRef}
          mousePosition={mousePosition}
          gameLandRef={sceneRef}
          battleMachineRef={battleMachineRef}
        />
      )}
    </>
  );
}
