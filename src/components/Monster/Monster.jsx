import { useRef, useState, useMemo, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

import { LaserShaderMaterial } from '../../materials/LaserShaderMaterial';
import { isOnBattleAtom, mouseFollowerPositionAtom, isSoundPlayingAtom } from '../../utils/atoms';

export default function Monster({ position, onAttack }) {
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const [isSoundPlaying] = useAtom(isSoundPlayingAtom);
  const [mouseFollowerPosition] = useAtom(mouseFollowerPositionAtom);
  const [isFiring, setIsFiring] = useState(false);

  const monsterRef = useRef();
  const laserRef = useRef();
  const soundRef = useRef();
  const lastFireTimeRef = useRef(0);

  const laserMaterial = useMemo(() => LaserShaderMaterial.clone(), []);

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
    if (monsterRef.current) {
      monsterRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 3;
    }

    if (isOnBattle) {
      const currentTime = state.clock.getElapsedTime();
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

    if (isFiring && laserRef.current && isOnBattle && mouseFollowerPosition) {
      const monsterPosition = new THREE.Vector3(...position);
      const targetPosition = mouseFollowerPosition.clone();

      const direction = targetPosition.clone().sub(monsterPosition).normalize();
      const laserStartPoint = monsterPosition.clone().add(direction.clone().multiplyScalar(9));

      const mouseFollowerRadius = 3; // MouseFollower의 반지름
      const laserRadius = 1.5; // 레이저의 반지름
      const maxDistance = 160;

      const distanceToFollower = laserStartPoint.distanceTo(targetPosition);
      const collisionDistance = mouseFollowerRadius + laserRadius;

      let laserEndPoint;
      let laserLength;

      if (distanceToFollower <= collisionDistance) {
        // 충돌 발생
        laserLength = distanceToFollower - collisionDistance;
        laserEndPoint = laserStartPoint.clone().add(direction.clone().multiplyScalar(laserLength));
        laserLength = Math.max(laserLength, 0); // Ensure laser length is not negative
        console.log('충돌 발생! 레이저 길이:', laserLength);
      } else {
        // 충돌하지 않음
        laserLength = Math.min(distanceToFollower - mouseFollowerRadius, maxDistance);
        laserEndPoint = laserStartPoint.clone().add(direction.clone().multiplyScalar(laserLength));
      }

      laserMaterial.uniforms.laserLength.value = laserLength / 100;
      laserMaterial.uniforms.time.value = state.clock.elapsedTime;

      const laserMidPoint = laserStartPoint
        .clone()
        .add(direction.clone().multiplyScalar(laserLength * 0.5));
      laserRef.current.position.copy(laserMidPoint);
      laserRef.current.scale.set(0.1, laserLength, 0.1);

      laserRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

      console.log('몬스터 위치:', monsterPosition);
      console.log('마우스 팔로워 위치:', targetPosition);
      console.log('레이저 시작점:', laserStartPoint);
      console.log('레이저 끝점:', laserEndPoint);
      console.log('레이저 길이:', laserLength);
      console.log('레이저 방향:', direction);
      console.log('마우스 팔로워까지의 거리:', distanceToFollower);
      console.log('충돌 거리:', collisionDistance);
    }
  });

  return (
    <>
      <Box
        ref={monsterRef}
        args={[18, 18, 18]}
        position={new THREE.Vector3(...position)}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="red" />
      </Box>
      {isFiring && isOnBattle && (
        <Cylinder ref={laserRef} args={[3.0, 3.0, 1, 8, 1, true]} material={laserMaterial} />
      )}
    </>
  );
}
