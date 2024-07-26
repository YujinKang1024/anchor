import { useAtom } from 'jotai';
import { useEffect, useCallback, useRef } from 'react';
import { isScrollingAtom, scrollPositionAtom } from '../utils/atoms';

import { MAX_SCROLL_SPEED } from '../constants/constants';

export default function useCanvasScrollHandler(canvasRef) {
  const [, setIsScrolling] = useAtom(isScrollingAtom);
  const [scrollPosition, setScrollPosition] = useAtom(scrollPositionAtom);
  const lastScrollPositionRef = useRef(0);

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      setIsScrolling(true);

      const delta = event.deltaY * 0.0000005; // 스크롤 속도 조절
      const currentScrollPosition = scrollPosition;
      let newScrollPosition;

      if (Math.abs(currentScrollPosition - lastScrollPositionRef.current) > MAX_SCROLL_SPEED) {
        newScrollPosition =
          lastScrollPositionRef.current +
          Math.sign(currentScrollPosition - lastScrollPositionRef.current) * MAX_SCROLL_SPEED;
      } else {
        newScrollPosition = currentScrollPosition + delta;
      }

      newScrollPosition = Math.max(0, Math.min(newScrollPosition, 1));
      setScrollPosition(newScrollPosition);
      lastScrollPositionRef.current = newScrollPosition;

      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    },
    [setIsScrolling, scrollPosition, setScrollPosition],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        canvas.removeEventListener('wheel', handleWheel);
      };
    }
  }, [canvasRef, handleWheel]);

  return [scrollPosition, setScrollPosition];
}
