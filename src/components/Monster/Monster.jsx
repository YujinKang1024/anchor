import { useRef, useState, useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
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
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

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
      const targetPosition = mouseFollowerRef.current.position.clone();

      const direction = targetPosition.clone().sub(monsterPosition).normalize();
      const laserStartPoint = monsterPosition.clone().add(direction.clone().multiplyScalar(9));

      // 레이캐스터 설정
      raycaster.params.Points.threshold = 0.1;
      raycaster.set(laserStartPoint, direction);
      const maxDistance = 200;

      const intersectObjects = [mouseFollowerRef.current, monsterRef.current];
      const intersects = raycaster.intersectObjects(intersectObjects, true);

      let laserEndPoint;
      if (intersects.length > 0 && intersects[0].distance < maxDistance) {
        laserEndPoint = intersects[0].point.clone();
        console.log('Collision detected:', intersects[0].object.name || 'Unknown object');
        console.log('Collision distance:', intersects[0].distance);
        console.log('Collision point:', laserEndPoint);
      } else {
        laserEndPoint = laserStartPoint.clone().add(direction.clone().multiplyScalar(maxDistance));
        console.log('No collision, using max length');
      }

      const laserLength = laserStartPoint.distanceTo(laserEndPoint);
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
