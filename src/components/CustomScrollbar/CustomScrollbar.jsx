import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

import { ScrollContainer, Scrollbar, Thumb, VirtualContent } from './CustomScrollbar.styles';

export default function CustomScrollbar({ boatRef, pathPoints }) {
  const [currentScrollRef, setCurrentScrollRef] = useState(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  const scrollRef = useRef();
  const initialBoatPositionRef = useRef({ x: 780, y: -500.5, z: 520 });

  const virtualScrollHeight = 10000;

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
    const scrollHeight = virtualScrollHeight;

    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    // const sensitivity = 0.8;
    const newThumbPosition = Math.min(scrollRatio * 100, 100);
    setThumbPosition(newThumbPosition);

    if (boatRef.current) {
      const pointIndex = Math.floor(scrollRatio * (pathPoints.length - 1)); // 현재 스크롤 위치에 해당하는 경로 상의 인덱스 점 계산 (현재 위치에 가장 가까운 경로 점)
      const nextPointIndex = Math.min(pointIndex + 1, pathPoints.length - 1); // 다음 스크롤 위치에 해당하는 인덱스 점 (pathPoints.length - 1 보다 커지지 않게 함)
      const lerpFactor = (scrollRatio * (pathPoints.length - 1)) % 1; // 보간 비율. 점과 점 사이의 어느 위치에 있어야 하는지 스크롤 비율에 기반하여 계산함

      const currentPoint = pathPoints[pointIndex];
      const nextPoint = pathPoints[nextPointIndex];

      const newPosition = new THREE.Vector3().lerpVectors(currentPoint, nextPoint, lerpFactor);

      boatRef.current.position.set(newPosition.x, -500.5, newPosition.y);

      console.log(newPosition);
    }

    console.log('scrollTop:', scrollTop);
    console.log('clientHeight:', clientHeight);
    console.log('virtualScrollHeight:', virtualScrollHeight);
    console.log('scrollRatio:', scrollRatio);
    console.log('newThumbPosition:', newThumbPosition);
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
