import { useState, useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import * as THREE from 'three';

import { Scrollbar, Thumb } from './CustomScrollbar.styles';
import animateBoatPosition from '../../utils/animateBoatPosition';
import eventBus from '../../utils/eventBus';
import useCanvasScrollHandler from '../../hooks/useCanvasScrollHandler';

import { isReturningAtom, isScrollingAtom } from '../../utils/atoms';
import { INITIAL_BOAT_POSITION_Y, SCROLL_BOTTOM_THRESHOLD } from '../../constants/constants';

export default function CustomScrollbar({ canvasRef, boatRef, pathPoints }) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [, setIsReturning] = useAtom(isReturningAtom);
  const [isScrolling] = useAtom(isScrollingAtom);

  const [scrollPosition, setScrollPosition] = useCanvasScrollHandler(canvasRef);

  const handleScroll = useCallback(() => {
    if (!pathPoints || pathPoints.length === 0 || !isScrolling) return;

    if (scrollPosition >= SCROLL_BOTTOM_THRESHOLD && !isAtBottom) {
      setIsAtBottom(true);
      setIsReturning(true);

      const newNextPoint = pathPoints[pathPoints.length - 1];
      const newCurrentPoint = pathPoints[0];
      const newBoatPosition = new THREE.Vector3().lerpVectors(newCurrentPoint, newNextPoint, 0.001);

      animateBoatPosition(newBoatPosition, newNextPoint, boatRef, INITIAL_BOAT_POSITION_Y, () => {
        setScrollPosition(0);
        setIsAtBottom(false);
        setIsReturning(false);
      });
    } else if (scrollPosition < SCROLL_BOTTOM_THRESHOLD && isAtBottom) {
      setIsAtBottom(false);
    }
  }, [
    scrollPosition,
    isAtBottom,
    pathPoints,
    boatRef,
    setIsReturning,
    setScrollPosition,
    isScrolling,
  ]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll, scrollPosition]);

  useEffect(() => {
    const updateScrollbar = ({ scrollPosition }) => {
      setScrollPosition(scrollPosition);
    };

    eventBus.on('updateScrollbar', updateScrollbar);

    return () => {
      eventBus.remove('updateScrollbar', updateScrollbar);
    };
  }, [setScrollPosition]);

  return (
    <Scrollbar>
      <Thumb $scrolltop={scrollPosition * 100} />
    </Scrollbar>
  );
}
