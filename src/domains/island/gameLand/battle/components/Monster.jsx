import { useRef, useState, useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { isSoundPlayingAtom } from '@/atoms';
import { isOnBattleAtom } from '@/domains/island/atoms/playerStateAtoms';
import { monsterHPAtom, decreaseMonsterHPAtom } from '@/domains/island/atoms/battleAtoms';

import { MonsterHPBar } from './MonsterHPBar';
import { Laser } from './Laser';

import monster from '@/assets/models/monster.glb';

const ROTATION_ANGLE = Math.PI / 4;

export const Monster = ({ position, onAttack }) => {
  const { scene: monsterScene } = useGLTF(monster);

  const [isFiring, setIsFiring] = useState(false);

  const [isOnBattle] = useAtom(isOnBattleAtom);
  const [, decreaseMonsterHP] = useAtom(decreaseMonsterHPAtom);
  const [isSoundPlaying] = useAtom(isSoundPlayingAtom);
  const [monsterHP] = useAtom(monsterHPAtom);

  const monsterRef = useRef();
  const soundRef = useRef();
  const lastFireTimeRef = useRef(0);
  const emissionMeshRef = useRef();

  const monsterRotation = useMemo(() => {
    return new THREE.Euler(0, ROTATION_ANGLE, 0);
  }, []);

  useEffect(() => {
    const emissionMesh = monsterScene.getObjectByName('monster_emission');
    if (emissionMesh) {
      emissionMeshRef.current = emissionMesh;
    }
  }, [monsterScene]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isOnBattle && event.code === 'Space') {
        decreaseMonsterHP(1.5);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOnBattle, decreaseMonsterHP]);

  useEffect(() => {
    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load('/sounds/laser.wav', (buffer) => {
      sound.setBuffer(buffer);
      sound.setVolume(0.05);
    });

    soundRef.current = sound;

    if (monsterRef.current) {
      monsterRef.current.add(listener);
    }
  }, []);

  useFrame((state) => {
    // 몬스터 애니메이션
    if (monsterRef.current && monsterHP > 0) {
      monsterRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 3;
    }

    // 레이저 발사
    if (isOnBattle && monsterHP > 0) {
      const currentTime = state.clock.elapsedTime;
      if (currentTime - lastFireTimeRef.current >= 1.2) {
        setIsFiring(true);
        onAttack();
        lastFireTimeRef.current = currentTime;

        if (soundRef.current && isSoundPlaying) {
          soundRef.current.play();
        }

        setTimeout(() => setIsFiring(false), 500);
      }
    }
  });

  return (
    <>
      {isOnBattle && <MonsterHPBar monsterRef={monsterRef} hp={monsterHP} />}
      <primitive
        object={monsterScene}
        ref={monsterRef}
        position={new THREE.Vector3(...position)}
        rotation={monsterRotation}
        castShadow
        receiveShadow
      />
      <Laser monsterRef={monsterRef} emissionMeshRef={emissionMeshRef} isFiring={isFiring} />
    </>
  );
};
