import * as THREE from 'three';

export function calculateSimplifiedWaveHeight(x, z, time) {
  const waveFrequency = 0.24;
  const waveAmplitude = 0.26;

  const wave1 = Math.sin(x * waveFrequency + time) * waveAmplitude;
  const wave2 = Math.sin(z * waveFrequency + time * 1.5) * waveAmplitude;

  return wave1 + wave2;
}

export const checkCollision = (scene, boatRef) => {
  const collidableObjects = [];
  scene.traverse((object) => {
    if (object.isMesh && object.name.startsWith('collision_')) {
      collidableObjects.push(object);
    }
  });

  // 보트 위치에서 시작하는 레이캐스터
  const rayOrigin = boatRef.current.position.clone();
  const rayLength = 10;

  // 360도 방향으로 레이캐스팅 (15도 간격)
  const angleStep = Math.PI / 12; // 15도
  const totalRays = 24; // 360도를 15도로 나눈 개수

  let closestIntersections = [];

  for (let i = 0; i < totalRays; i++) {
    const angle = i * angleStep;
    const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();

    // 레이캐스터 업데이트
    const raycaster = new THREE.Raycaster(rayOrigin, direction, 0, rayLength);
    const intersects = raycaster.intersectObjects(collidableObjects, true);

    if (intersects.length > 0 && intersects[0].distance < rayLength) {
      closestIntersections.push({
        intersection: intersects[0],
        direction: direction,
      });
    }
  }

  // 가장 가까운 교차점들 반환 (여러 방향의 충돌 고려)
  return closestIntersections;
};

export const handleCollision = (intersections, prevPosition, currentY, boatState) => {
  if (intersections.length === 0) return null;

  // 모든 충돌 지점에서의 반발력 계산
  const totalRepulsion = new THREE.Vector3();
  let maxRepulsionForce = 0;

  intersections.forEach(({ intersection }) => {
    // 충돌 지점의 법선 벡터
    const normal = intersection.face.normal.clone();
    normal.y = 0;
    normal.normalize();

    // 충돌 깊이에 따른 반발력 계산
    const penetrationDepth = Math.max(0, 8 - intersection.distance);
    const baseRepulsionForce = 1.5 + penetrationDepth * 0.4;

    // 진행 방향과 충돌 방향 사이의 각도 고려
    const currentDirection = new THREE.Vector3(
      -Math.cos(boatState.rotation),
      0,
      Math.sin(boatState.rotation),
    ).normalize();

    const dot = currentDirection.dot(normal);
    const angleMultiplier = 1 - Math.abs(dot);
    const repulsionForce = baseRepulsionForce * (1 + angleMultiplier);

    // 반발 벡터 계산 및 누적
    const repulsionVector = normal.multiplyScalar(repulsionForce);
    totalRepulsion.add(repulsionVector);

    maxRepulsionForce = Math.max(maxRepulsionForce, repulsionForce);
  });

  // 평균 반발 방향 계산
  totalRepulsion.divideScalar(intersections.length);

  // 현재 진행 방향의 영향을 추가
  const currentDirection = new THREE.Vector3(
    -Math.cos(boatState.rotation),
    0,
    Math.sin(boatState.rotation),
  ).normalize();

  // 최종 반발 방향 계산 (진행 방향과 반발 방향을 블렌딩)
  const blendedDirection = new THREE.Vector3()
    .addVectors(
      totalRepulsion.normalize().multiplyScalar(0.7),
      currentDirection.multiplyScalar(0.3),
    )
    .normalize()
    .multiplyScalar(maxRepulsionForce);

  // 새로운 위치 계산
  const newPosition = prevPosition.clone().add(blendedDirection);
  newPosition.y = currentY;

  return {
    position: newPosition,
    repulsionForce: maxRepulsionForce,
  };
};
