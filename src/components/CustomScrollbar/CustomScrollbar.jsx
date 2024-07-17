import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

import { ScrollContainer, Scrollbar, Thumb, VirtualContent } from './CustomScrollbar.styles';

import initializeBoatPosition from '../../utils/initializeBoatPosition';
import animateBoatPosition from '../../utils/animateBoatPosition';
import { BOAT_POSITION_Y, SCROLLBAR_HEIGHT_RATIO } from '../../constants/constants';

export default function CustomScrollbar({ boatRef, pathPoints }) {
  const [currentScrollRef, setCurrentScrollRef] = useState(null);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollRef = useRef();

  const virtualScrollHeight = 30000;
  const initialBoatPositionY = -500.5;
  const scrollbarHeightRatio = 0.97;

  useEffect(() => {
    initializeBoatPosition(boatRef, pathPoints, BOAT_POSITION_Y, 0.88);
  }, [boatRef, pathPoints]);

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

      animateBoatPosition(newBoatPosition, newNextPoint, boatRef, BOAT_POSITION_Y, () => {
        scrollRef.current.scrollTop = 0;
        lastScrollTopRef.current = 0;
        setIsAtBottom(false);
      });
    }

    if (boatRef.current && !isAtBottom) {
      const pathLength = pathPoints.length - 1;
      const scaledScrollRatio = scrollRatio * pathLength;

      const pointIndex = Math.floor(scaledScrollRatio);
      const nextPointIndex = (pointIndex + 1) % pathPoints.length;
      const lerpFactor = scaledScrollRatio % 1;

      const currentPoint = pathPoints[pointIndex];
      const nextPoint = pathPoints[nextPointIndex];
      const newPosition = new THREE.Vector3().lerpVectors(currentPoint, nextPoint, lerpFactor);

      boatRef.current.position.set(newPosition.x, BOAT_POSITION_Y, newPosition.y);
    }
  }, [boatRef, pathPoints, isAtBottom]);

  useEffect(() => {
    setCurrentScrollRef(scrollRef.current);

    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentScrollRef) {
        currentScrollRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentScrollRef, handleScroll]);

  return (
    <ScrollContainer ref={scrollRef}>
      <VirtualContent />
      <Scrollbar>
        <Thumb $scrolltop={thumbPosition} />
      </Scrollbar>
    </ScrollContainer>
  );
}
