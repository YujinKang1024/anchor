import { useState, useRef, useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { ScrollContainer, Scrollbar, Thumb, VirtualContent } from './CustomScrollbar.styles';

import animateBoatPosition from '../../utils/animateBoatPosition';
import useScrollHandler from '../../hooks/useScrollHandler';

import { targetRotationAtom } from '../../utils/atoms';
import { INITIAL_BOAT_POSITION_Y, SCROLLBAR_HEIGHT_RATIO } from '../../constants/constants';

const rotationAngles = {
  58: 1.3,
  56: 1,
  46: 0.45,
  44: 0.1,
  42: -0.5,
  39: -0.9,
  34: -1,
  32: -1.4,
  29: -1.8,
  24: -2,
  22: -2.5,
  20: -3.4,
  9: -4,
  7: -4.5,
};

export default function CustomScrollbar({ boatRef, pathPoints }) {
  const [thumbPosition, setThumbPosition] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [initialRotationSet, setInitialRotationSet] = useState(false);

  const [, setTargetRotation] = useAtom(targetRotationAtom);

  const scrollRef = useRef();
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    if (boatRef.current) {
      const initialPointIndex = 0;
      const nearestRotationAngle = findNearestRotationAngle(initialPointIndex);

      setTargetRotation(nearestRotationAngle);

      boatRef.current.rotation.y = nearestRotationAngle;
    }
  }, [boatRef, pathPoints, setTargetRotation]);

  const findNearestRotationAngle = (pointIndex) => {
    const indices = Object.keys(rotationAngles).map(Number);
    const closestIndex = indices.reduce((prev, curr) =>
      Math.abs(curr - pointIndex) < Math.abs(prev - pointIndex) ? curr : prev,
    );

    return rotationAngles[closestIndex];
  };

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || pathPoints.length === 0) return;

    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;
    const scrollHeight = scrollRef.current.scrollHeight;
    const scrollbarHeight = clientHeight * SCROLLBAR_HEIGHT_RATIO;

    const scrollRatio = 1 - scrollTop / (scrollHeight - clientHeight);
    const newThumbPosition = Math.min((1 - scrollRatio) * 100, 100);

    setThumbPosition(newThumbPosition);

    if (
      scrollTop + clientHeight >= scrollHeight - scrollbarHeight * (1 - SCROLLBAR_HEIGHT_RATIO) &&
      !isAtBottom
    ) {
      setIsAtBottom(true);

      const newCurrentPoint = pathPoints[0];
      const newNextPoint = pathPoints[pathPoints.length - 1];
      const newBoatPosition = new THREE.Vector3().lerpVectors(newCurrentPoint, newNextPoint, 0.2);

      animateBoatPosition(newBoatPosition, newNextPoint, boatRef, INITIAL_BOAT_POSITION_Y, () => {
        scrollRef.current.scrollTop = 0;
        lastScrollTopRef.current = 0;
        setIsAtBottom(false);
      });
    }

    if (boatRef.current && !isAtBottom) {
      const pathLength = pathPoints.length - 1;
      const scaledScrollRatio = scrollRatio * pathLength;

      const pointIndex = Math.floor(scaledScrollRatio);
      const nextPointIndex = Math.min(pointIndex + 1, pathPoints.length - 1);
      const lerpFactor = scaledScrollRatio % 1;

      const currentPoint = pathPoints[pointIndex];
      const nextPoint = pathPoints[nextPointIndex];
      const newPosition = new THREE.Vector3().lerpVectors(currentPoint, nextPoint, lerpFactor);

      boatRef.current.position.set(newPosition.x, INITIAL_BOAT_POSITION_Y, newPosition.y);

      if (!initialRotationSet) {
        setInitialRotationSet(true);
      } else {
        if (rotationAngles[pointIndex] !== undefined) {
          setTargetRotation(rotationAngles[pointIndex]);
        }
      }
    }
  }, [boatRef, pathPoints, isAtBottom, setTargetRotation, initialRotationSet]);

  const handleLimitedScroll = useScrollHandler(scrollRef, lastScrollTopRef, handleScroll);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleLimitedScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleLimitedScroll);
      }
    };
  }, [handleLimitedScroll]);

  return (
    <ScrollContainer ref={scrollRef}>
      <VirtualContent />
      <Scrollbar>
        <Thumb $scrolltop={thumbPosition} />
      </Scrollbar>
    </ScrollContainer>
  );
}
