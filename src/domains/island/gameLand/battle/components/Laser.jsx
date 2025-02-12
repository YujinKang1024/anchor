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
      if (!monsterRef.current || !emissionMeshRef.current) return null;

      const normalizedX = (mouseX / window.innerWidth) * 2 - 1;
      const normalizedY = -(mouseY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(normalizedX, normalizedY), camera);

      const cameraDirection = new THREE.Vector3(0, 0, -1);
      cameraDirection.applyQuaternion(camera.quaternion);

      const plane = new THREE.Plane();
      plane.setFromNormalAndCoplanarPoint(cameraDirection, new THREE.Vector3(0, 0, 0));

      const targetPosition = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, targetPosition);

      return targetPosition;
    },
    [camera, monsterRef, emissionMeshRef],
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

    const emissionWorldPosition = new THREE.Vector3();
    emissionMeshRef.current.getWorldPosition(emissionWorldPosition);
    emissionWorldPosition.y += 20;

    const monsterRotation = monsterRef.current.rotation.y;
    const offsetDistance = 5;
    emissionWorldPosition.x += Math.sin(monsterRotation) * offsetDistance;
    emissionWorldPosition.z += Math.cos(monsterRotation) * offsetDistance;

    const targetPosition = getTargetPosition(mousePosition.x, mousePosition.y);
    if (!targetPosition) return;

    const direction = new THREE.Vector3();
    direction.subVectors(targetPosition, emissionWorldPosition).normalize();

    const raycaster = new THREE.Raycaster();
    raycaster.ray.origin.copy(emissionWorldPosition);
    raycaster.ray.direction.copy(direction);

    const monsterMeshes = [];
    monsterRef.current.traverse((child) => {
      if (child.isMesh) {
        child.updateMatrixWorld();
        monsterMeshes.push(child);
      }
    });

    const intersects = raycaster.intersectObjects(monsterMeshes, true);

    const distanceToTarget = emissionWorldPosition.distanceTo(targetPosition);
    const finalDistance = Math.min(Math.max(distanceToTarget, 1), 500);

    if (intersects.length > 0 && intersects[0].distance < finalDistance) {
      const intersectionPoint = emissionWorldPosition
        .clone()
        .add(direction.clone().multiplyScalar(intersects[0].distance));
      const remainingDistance = finalDistance - intersects[0].distance;

      const startPoint = intersectionPoint.clone().add(direction.clone().multiplyScalar(2));
      const midPoint = startPoint
        .clone()
        .add(direction.clone().multiplyScalar(remainingDistance * 0.5));

      laserRef.current.position.copy(midPoint);
      laserRef.current.scale.set(0.15, remainingDistance, 0.15);
      laserRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    } else {
      // 교차하지 않는 경우 전체 레이저 표시
      const midPoint = emissionWorldPosition
        .clone()
        .add(direction.clone().multiplyScalar(finalDistance * 0.5));

      laserRef.current.position.copy(midPoint);
      laserRef.current.scale.set(0.15, finalDistance, 0.15);
      laserRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    }
  }, [getTargetPosition, mousePosition.x, mousePosition.y, emissionMeshRef, monsterRef]);

  useFrame((state) => {
    if (isFiring) {
      updateLaser(state);
    } else {
      if (laserRef.current) laserRef.current.visible = false;
    }
  });

  if (!isFiring) return null;

  return <Cylinder ref={laserRef} args={[3.0, 3.0, 1, 8, 1, true]} material={laserMaterial} />;
};
