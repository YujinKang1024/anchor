import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

import { ScrollContainer, Scrollbar, Thumb, VirtualContent } from './CustomScrollbar.styles';

export default function CustomScrollbar({ boatRef, pathPoints }) {
  const [currentScrollRef, setCurrentScrollRef] = useState(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  const scrollRef = useRef();
  const initialBoatPositionRef = useRef({ x: 780, y: -500.5, z: 520 });

  const virtualScrollHeight = 50000;

  useEffect(() => {
    if (boatRef.current) {
      initialBoatPositionRef.current = {
        x: boatRef.current.position.x,
        y: boatRef.current.position.y,
        z: boatRef.current.position.z,
      };
    }
  }, [boatRef]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current || pathPoints.length === 0) return;

    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;
    const scrollHeight = scrollRef.current.scrollHeight;

    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    const newThumbPosition = Math.min(scrollRatio * 100, 100);

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

      boatRef.current.position.set(newPosition.x, -500.5, newPosition.y);
    }
  }, [boatRef, pathPoints]);

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
      <VirtualContent height={virtualScrollHeight} />
      <Scrollbar>
        <Thumb top={thumbPosition} />
      </Scrollbar>
    </ScrollContainer>
  );
}
