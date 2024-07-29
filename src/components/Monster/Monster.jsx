import { useRef, useState, useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

import { LaserShaderMaterial } from '../../materials/LaserShaderMaterial';
import { isOnBattleAtom } from '../../utils/atoms';

export default function Monster({ position, mouseFollowerRef }) {
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const [isFiring, setIsFiring] = useState(false);

  const monsterRef = useRef();
  const laserRef = useRef();
  const intervalRef = useRef(null);

  const laserMaterial = useMemo(() => LaserShaderMaterial.clone(), []);

  useEffect(() => {
    if (isOnBattle) {
      const fireLaser = () => {
        setIsFiring(true);
        setTimeout(() => setIsFiring(false), 500);
      };
      fireLaser();
      intervalRef.current = setInterval(fireLaser, 2000);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isOnBattle]);

  useFrame((state) => {
    if (monsterRef.current) {
      monsterRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 3;
    }
    if (isFiring && laserRef.current && isOnBattle && mouseFollowerRef.current) {
      const monsterPosition = new THREE.Vector3(...position);
      // monsterPosition.y += 9; // 몬스터의 중앙점으로 조정

      // 레이저 시작점을 몬스터의 앞쪽 면으로 조정
      const laserStartPoint = monsterPosition.clone();
      // laserStartPoint.x += 9; // 몬스터의 x축 크기의 절반만큼 앞으로 이동

      const end = mouseFollowerRef.current.position.clone();

      const direction = end.clone().sub(laserStartPoint);
      const laserLength = direction.length();
      direction.normalize();

      // 레이저 길이 조절 (예: 최대 길이를 100으로 제한)
      const maxLength = 150;
      const scaledLength = Math.min(laserLength, maxLength);

      laserMaterial.uniforms.laserLength.value = scaledLength / 100; // 셰이더에서 사용할 정규화된 길이
      laserMaterial.uniforms.time.value = state.clock.elapsedTime;

      laserRef.current.position.copy(laserStartPoint);
      laserRef.current.lookAt(end);

      laserRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

      laserRef.current.scale.set(1, scaledLength, 1); // x와 z 스케일을 작게 설정하여 레이저를 얇게 만듦

      console.log('시작점', laserStartPoint);
      console.log('끝점', end);
      console.log('레이저 길이', scaledLength);
    }
  });

  // ...

  return (
    <>
      <Box
        ref={monsterRef}
        args={[18, 18, 18]}
        position={new THREE.Vector3(position[0], position[1], position[2])}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="red" />
      </Box>
      {isFiring && isOnBattle && (
        <mesh ref={laserRef} material={laserMaterial}>
          <planeGeometry args={[1, 1, 1, 10]} />
        </mesh>
      )}
    </>
  );
}
