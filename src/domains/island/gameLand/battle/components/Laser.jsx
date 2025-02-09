import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

import { createLaserShaderMaterial } from '@/shared/utils';

export const Laser = ({ monsterRef, emissionMeshRef, isFiring }) => {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const laserRef = useRef();

  const getTargetPosition = useCallback(
    (mouseX, mouseY) => {
      // 스크린 좌표를 -1에서 1 사이로 정규화
      const normalizedX = (mouseX / window.innerWidth) * 2 - 1;
      const normalizedY = -(mouseY / window.innerHeight) * 2 + 1;

      // 레이캐스터 생성
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(normalizedX, normalizedY), camera);

      // 가상의 평면 생성 (y=50에 위치한 수평면)
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -50);

      // 레이캐스터와 평면의 교차점 계산
      const targetPosition = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, targetPosition);

      return targetPosition;
    },
    [camera],
  );

  const laserMaterial = useMemo(() => {
    const material = createLaserShaderMaterial.clone();
    material.transparent = true;
    material.depthTest = false;
    material.depthWrite = false;
    return material;
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const updateLaser = useCallback(() => {
    if (!laserRef.current || !emissionMeshRef.current || !monsterRef.current) return;

    // emission mesh의 월드 포지션 계산
    const emissionWorldPosition = new THREE.Vector3();
    emissionMeshRef.current.getWorldPosition(emissionWorldPosition);

    emissionWorldPosition.y += 10;

    // 타겟 위치 계산
    const targetPosition = getTargetPosition(mousePosition.x, mousePosition.y);

    if (!targetPosition) return; // 교차점이 없는 경우 처리

    // 레이저 방향 계산
    const direction = new THREE.Vector3();
    direction.subVectors(targetPosition, emissionWorldPosition).normalize();

    // 실제 거리 계산
    const distanceToTarget = emissionWorldPosition.distanceTo(targetPosition);
    let finalDistance = distanceToTarget;

    // 최대/최소 거리 제한
    finalDistance = Math.min(finalDistance, 500);
    finalDistance = Math.max(finalDistance, 1);

    // 레이저 중간점 계산 및 위치 설정
    const midPoint = emissionWorldPosition
      .clone()
      .add(direction.clone().multiplyScalar(finalDistance * 0.5));

    laserRef.current.position.copy(midPoint);
    laserRef.current.scale.set(0.15, finalDistance, 0.15);
    laserRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  }, [getTargetPosition, mousePosition.x, mousePosition.y, emissionMeshRef, monsterRef]);

  useFrame((state) => {
    if (isFiring) {
      updateLaser(state);
    }
  });

  if (!isFiring) return null;

  return <Cylinder ref={laserRef} args={[3.0, 3.0, 1, 8, 1, true]} material={laserMaterial} />;
};
