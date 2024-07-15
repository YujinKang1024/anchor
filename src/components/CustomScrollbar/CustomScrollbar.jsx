import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ScrollContainer,
  Scrollbar,
  Thumb,
  VirtualContent,
} from './CustomScrollbar.styles';

export default function CustomScrollbar({ boatRef }) {
  const scrollRef = useRef();
  const [currentScrollRef, setCurrentScrollRef] = useState(null);
  const [thumbPosition, setThumbPosition] = useState(0);
  const virtualScrollHeight = 8000;

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;
    const scrollHeight = scrollRef.current.scrollHeight;

    const newThumbPosition = Math.min(
      (scrollTop / (scrollHeight - clientHeight)) * 100,
      100,
    );
    setThumbPosition(newThumbPosition);

    if (boatRef.current) {
      const boatMaxDistanceX = 1000;
      const boatMaxDistanceZ = 500;
      const boatPositionX =
        (scrollTop / (scrollHeight - clientHeight)) * boatMaxDistanceX;
      const boatPositionZ =
        (scrollTop / (scrollHeight - clientHeight)) * boatMaxDistanceZ;
      boatRef.current.position.set(
        boatPositionX,
        boatRef.current.position.y,
        boatPositionZ,
      );
    }
  }, [boatRef]);

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
