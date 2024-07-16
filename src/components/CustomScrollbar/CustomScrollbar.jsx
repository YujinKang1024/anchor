import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

import { ScrollContainer, Scrollbar, Thumb, VirtualContent } from './CustomScrollbar.styles';

export default function CustomScrollbar({ boatRef, pathPoints }) {
  const [currentScrollRef, setCurrentScrollRef] = useState(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  const scrollRef = useRef();

  const virtualScrollHeight = 50000;
  const initialBoatPositionY = -500.5;
  const scrollbarHeightRatio = 0.97;

  useEffect(() => {
    if (boatRef.current && pathPoints.length > 0) {
      const initialPoint = pathPoints[0];
      const initialNextPoint = pathPoints[pathPoints.length - 1];
      const initialBoatPosition = new THREE.Vector3().lerpVectors(
        initialPoint,
        initialNextPoint,
        0.98,
      );
      boatRef.current.position.set(
        initialBoatPosition.x,
        initialBoatPositionY,
        initialBoatPosition.y,
      );
    }
  }, [boatRef, pathPoints, initialBoatPositionY]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || pathPoints.length === 0) return;

    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;
    const scrollHeight = scrollRef.current.scrollHeight;
    const scrollRatio = 1 - scrollTop / (scrollHeight - clientHeight);
    const newThumbPosition = Math.min((1 - scrollRatio) * 100, 100);

    setThumbPosition(newThumbPosition);

    if (boatRef.current) {
      const pathLength = pathPoints.length - 1;
      const scaledScrollRatio = scrollRatio * pathLength;

      const pointIndex = Math.floor(scaledScrollRatio);
      const nextPointIndex = (pointIndex + 1) % pathPoints.length;
      const lerpFactor = scaledScrollRatio % 1;

      const currentPoint = pathPoints[pointIndex];
      const nextPoint = pathPoints[nextPointIndex];
      const newPosition = new THREE.Vector3().lerpVectors(currentPoint, nextPoint, lerpFactor);

      console.log('포인트', pointIndex);
      console.log('탑', scrollTop);

      boatRef.current.position.set(newPosition.x, initialBoatPositionY, newPosition.y);
    }
  }, [boatRef, pathPoints, initialBoatPositionY]);

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
      <VirtualContent $contentheight={virtualScrollHeight} />
      <Scrollbar $scrollbarheight={scrollbarHeightRatio}>
        <Thumb $scrolltop={thumbPosition} />
      </Scrollbar>
    </ScrollContainer>
  );
}
