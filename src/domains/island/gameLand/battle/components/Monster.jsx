import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import { useFrame, useThree } from '@react-three/fiber';
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
  const { camera } = useThree();

  const [isFiring, setIsFiring] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateRotation = useCallback(() => {
    if (!monsterRef.current || !isOnBattle) return ROTATION_ANGLE;

    // 스크린 좌표를 -1에서 1 사이로 정규화
    const normalizedX = (mousePosition.x / window.innerWidth) * 2 - 1;
    const normalizedY = -(mousePosition.y / window.innerHeight) * 2 + 1;

    // 레이캐스터 생성 및 마우스 위치로 발사
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(normalizedX, normalizedY), camera);

    // 가상의 평면 생성 (몬스터의 높이에 위치한 수평면)
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -position[1]);

    // 레이캐스터와 평면의 교차점 계산
    const targetPosition = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, targetPosition);

    const monsterPosition = new THREE.Vector3(...position);

    // 몬스터에서 타겟으로의 방향 벡터 계산
    const direction = targetPosition.sub(monsterPosition).normalize();
    const angle = Math.atan2(direction.x, direction.z);

    return ROTATION_ANGLE + angle + 1;
  }, [camera, mousePosition, position, isOnBattle]);

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

      const targetAngle = calculateRotation();
      if (isOnBattle) {
        monsterRef.current.rotation.y = THREE.MathUtils.lerp(
          monsterRef.current.rotation.y,
          targetAngle,
          0.1,
        );
      } else {
        monsterRef.current.rotation.y = ROTATION_ANGLE;
      }
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
