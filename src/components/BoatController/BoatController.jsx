import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import eventBus from '../../utils/eventBus';
import { INITIAL_BOAT_POSITION_Y } from '../../constants/constants';
import { targetRotationAtom, scrollPositionAtom, isScrollingAtom } from '../../utils/atoms';

const rotationAngles = {
  0: 6.9,
  42: 6.75,
  40: 6.5,
  39: 6.3,
  37: 6.1,
  35: 5.9,
  33: 5.75,
  27: 5.2,
  25: 4.8,
  24: 4.7,
  23: 4.6,
  22: 4.2,
  21: 3.7,
  20: 3.4,
  19: 3.1,
  18: 3.0,
  14: 3.2,
  13: 3.4,
  11: 2.8,
  10: 2.7,
  9: 2.5,
  8: 2.2,
  7: 1.8,
  6: 1.5,
  4: 1.2,
  3: 1.0,
};

export default function BoatController({ boatRef, pathPoints }) {
  const [targetRotation, setTargetRotation] = useAtom(targetRotationAtom);
  const [scrollPosition] = useAtom(scrollPositionAtom);
  const [isScrolling] = useAtom(isScrollingAtom);

  const currentBoatPosition = useRef(new THREE.Vector3());
  const targetBoatPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    if (boatRef.current && pathPoints.length > 0) {
      const initialPosition = new THREE.Vector3(
        pathPoints[0].x,
        INITIAL_BOAT_POSITION_Y,
        pathPoints[0].y,
      );
      currentBoatPosition.current.copy(initialPosition);
      targetBoatPosition.current.copy(initialPosition);
      boatRef.current.position.copy(initialPosition);
    }
  }, [boatRef, pathPoints]);

  const findNearestRotationAngle = (pointIndex) => {
    const indices = Object.keys(rotationAngles).map(Number);
    const closestIndex = indices.reduce((prev, curr) =>
      Math.abs(curr - pointIndex) < Math.abs(prev - pointIndex) ? curr : prev,
    );
    return rotationAngles[closestIndex];
  };

  useFrame(() => {
    if (boatRef.current && pathPoints.length > 0 && isScrolling) {
      // 위치 업데이트
      const pathLength = pathPoints.length;
      const scaledScrollPosition = (1 - scrollPosition) * pathLength;

      const pointIndex = Math.floor(scaledScrollPosition);
      const nextPointIndex = Math.min(pointIndex - 1, pathLength);
      const lerpFactor = 1 - (scaledScrollPosition % 1);

      const currentPoint = pathPoints[pointIndex];
      const nextPoint = pathPoints[nextPointIndex];

      targetBoatPosition.current.set(
        THREE.MathUtils.lerp(currentPoint.x, nextPoint.x, lerpFactor),
        INITIAL_BOAT_POSITION_Y,
        THREE.MathUtils.lerp(currentPoint.y, nextPoint.y, lerpFactor),
      );

      boatRef.current.position.lerp(targetBoatPosition.current, 0.1);

      // 목표 회전 각도 업데이트
      const newTargetRotation = findNearestRotationAngle(pointIndex);
      setTargetRotation(newTargetRotation);

      // 회전 업데이트
      const currentRotation = boatRef.current.rotation.y;
      let deltaRotation = targetRotation - currentRotation;

      deltaRotation = ((deltaRotation + Math.PI) % (2 * Math.PI)) - Math.PI;

      boatRef.current.rotation.y = THREE.MathUtils.lerp(
        currentRotation,
        currentRotation + deltaRotation,
        0.012,
      );

      // 이벤트 발생
      eventBus.dispatch('updateScrollbar', {
        scrollPosition,
        boatPosition: boatRef.current.position,
      });
    }
  });

  return null;
}
