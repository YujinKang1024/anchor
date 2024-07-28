import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import eventBus from '../../utils/eventBus';
import { INITIAL_BOAT_POSITION_Y, SCROLL_BOTTOM_THRESHOLD } from '../../constants/constants';
import {
  targetRotationAtom,
  scrollPositionAtom,
  isScrollingAtom,
  isReturningAtom,
} from '../../utils/atoms';

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
  const [, setTargetRotation] = useAtom(targetRotationAtom);
  const [scrollPosition] = useAtom(scrollPositionAtom);
  const [isScrolling, setIsScrolling] = useAtom(isScrollingAtom);
  const [isReturning, setIsReturning] = useAtom(isReturningAtom);

  const currentBoatPosition = useRef(new THREE.Vector3());
  const targetBoatPosition = useRef(new THREE.Vector3());
  const returnStartTime = useRef(null);
  const returnProgressRef = useRef(0);

  useEffect(() => {
    if (boatRef.current && pathPoints.length > 0) {
      const initialPosition = new THREE.Vector3(
        pathPoints[0].x,
        INITIAL_BOAT_POSITION_Y,
        pathPoints[0].y,
      );
      const nearestRotationAngle = findNearestRotationAngle(0);

      setTargetRotation(nearestRotationAngle);

      currentBoatPosition.current.copy(initialPosition);
      targetBoatPosition.current.copy(initialPosition);
      boatRef.current.position.copy(initialPosition);
      boatRef.current.rotation.y = nearestRotationAngle;

      eventBus.dispatch('updateScrollbar', {
        scrollPosition: 0,
        boatPosition: initialPosition,
      });
    }
  }, [boatRef, pathPoints, setTargetRotation]);

  const findNearestRotationAngle = (pointIndex) => {
    const indices = Object.keys(rotationAngles).map(Number);
    const closestIndex = indices.reduce((prev, curr) =>
      Math.abs(curr - pointIndex) < Math.abs(prev - pointIndex) ? curr : prev,
    );
    return rotationAngles[closestIndex];
  };

  const interpolateRotation = (startAngle, endAngle, t) => {
    let delta = endAngle - startAngle;
    if (Math.abs(delta) > Math.PI) {
      if (delta > 0) {
        delta -= Math.PI * 2;
      } else {
        delta += Math.PI * 2;
      }
    }
    return startAngle + delta * t;
  };

  useFrame((state) => {
    if (isScrolling || isReturning) {
      if (boatRef.current && pathPoints.length > 0) {
        const pathLength = pathPoints.length - 1;
        const scaledScrollPosition = (1 - scrollPosition) * pathLength;
        let currentRotation = boatRef.current.rotation.y;

        if (isReturning) {
          const returnDuration = 1000;
          const elapsedTime = state.clock.elapsedTime * 1000 - returnStartTime.current;
          returnProgressRef.current = Math.min(elapsedTime / returnDuration, 1);

          if (returnProgressRef.current >= 1) {
            setIsReturning(false);
            returnStartTime.current = null;
            returnProgressRef.current = 0;
          }
        }

        const pointIndex = Math.floor(scaledScrollPosition);
        const nextPointIndex = isReturning ? pathLength : Math.max(pointIndex - 1, 0);
        const lerpFactor = 1 - (scaledScrollPosition % 1);

        if (pointIndex >= 0 && pointIndex < pathPoints.length) {
          const currentPoint = pathPoints[pointIndex];
          const nextPoint = pathPoints[nextPointIndex];

          targetBoatPosition.current.set(
            THREE.MathUtils.lerp(currentPoint.x, nextPoint.x, lerpFactor),
            INITIAL_BOAT_POSITION_Y,
            THREE.MathUtils.lerp(currentPoint.y, nextPoint.y, lerpFactor),
          );

          boatRef.current.position.lerp(targetBoatPosition.current, 0.01);

          const distanceSquared = boatRef.current.position.distanceToSquared(
            targetBoatPosition.current,
          );
          const threshold = 0.00000001;
          if (distanceSquared < threshold) {
            boatRef.current.position.copy(targetBoatPosition.current);
          }

          if (!isReturning && isScrolling) {
            const newTargetRotation = findNearestRotationAngle(pointIndex);
            currentRotation = interpolateRotation(currentRotation, newTargetRotation, 0.01);
          }

          boatRef.current.rotation.y = currentRotation;

          eventBus.dispatch('updateScrollbar', {
            scrollPosition: scrollPosition,
            boatPosition: boatRef.current.position,
          });

          console.log('scrollPosition', scrollPosition);
          console.log('리터닝 상태:', isReturning);
          console.log('프로그레스 레프:', returnProgressRef.current);
          console.log('포인트:', pointIndex, '넥스트 포인트:', nextPointIndex);
        }
        if (!isReturning && scrollPosition >= SCROLL_BOTTOM_THRESHOLD && isScrolling) {
          console.log('리터닝 스크롤 포지션', scrollPosition);
          setIsReturning(true);
          setIsScrolling(false);
          returnStartTime.current = state.clock.elapsedTime * 1000;
        }
      }
    }
  });

  return null;
}
