import { useEffect, useCallback, useRef } from 'react';
import { useAtom } from 'jotai';
import { isScrollingAtom, scrollPositionAtom, isReturningAtom } from '../../utils/atoms';
import eventBus from '../../utils/eventBus';
import { Scrollbar, Thumb } from './CustomScrollbar.styles';
import { MAX_SCROLL_SPEED, SCROLL_BOTTOM_THRESHOLD } from '../../constants/constants';

export default function CustomScrollbar({ canvasRef }) {
  const [, setIsScrolling] = useAtom(isScrollingAtom);
  const [scrollPosition, setScrollPosition] = useAtom(scrollPositionAtom);
  const [isReturning, setIsReturning] = useAtom(isReturningAtom);
  const lastScrollPositionRef = useRef(0);

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      setIsScrolling(true);

      const delta = event.deltaY * 0.0000012;
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

      if (newScrollPosition >= SCROLL_BOTTOM_THRESHOLD && !isReturning) {
        setIsReturning(true);
        newScrollPosition = 0;
      } else if (isReturning && newScrollPosition < 1) {
        setIsReturning(false);
      }

      setScrollPosition(newScrollPosition);
      lastScrollPositionRef.current = newScrollPosition;

      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    },
    [setIsScrolling, scrollPosition, setScrollPosition, isReturning, setIsReturning],
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

  useEffect(() => {
    const updateScrollbar = ({ scrollPosition: newScrollPosition }) => {
      if (!isReturning) {
        setScrollPosition(newScrollPosition);
      } else {
        setScrollPosition((prevPosition) => Math.max(0, prevPosition - 0.01));
      }
    };

    eventBus.on('updateScrollbar', updateScrollbar);
    return () => {
      eventBus.remove('updateScrollbar', updateScrollbar);
    };
  }, [setScrollPosition, isReturning]);

  return (
    <Scrollbar>
      <Thumb $scrolltop={scrollPosition * 100} />
    </Scrollbar>
  );
}
