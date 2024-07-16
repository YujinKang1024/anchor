import { useState, useRef, useEffect, useCallback } from 'react';
import { ScrollContainer, Scrollbar, Thumb, VirtualContent } from './CustomScrollbar.styles';

export default function CustomScrollbar({ boatRef }) {
  const [currentScrollRef, setCurrentScrollRef] = useState(null);
  const [thumbPosition, setThumbPosition] = useState(0);

  const scrollRef = useRef();
  const initialBoatPositionRef = useRef({ x: 780, y: -500.5, z: 520 });

  const virtualScrollHeight = 8000;

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
    if (!scrollRef.current) return;

    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;
    const scrollHeight = scrollRef.current.scrollHeight;

    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    const sensitivity = 0.8;

    const newThumbPosition = Math.min(scrollRatio * 100, 100);
    setThumbPosition(newThumbPosition);

    if (boatRef.current) {
      const boatMaxDistanceX = 100;
      const boatMaxDistanceZ = 50;
      const boatPositionX =
        (scrollTop / (scrollHeight - clientHeight)) * boatMaxDistanceX * sensitivity;
      const boatPositionZ =
        (scrollTop / (scrollHeight - clientHeight)) * boatMaxDistanceZ * sensitivity;
      console.log('boatPositionX:', boatPositionX);
      console.log('boatPositionZ:', boatPositionZ);
      boatRef.current.position.set(
        initialBoatPositionRef.current.x + boatPositionX,
        initialBoatPositionRef.current.y,
        initialBoatPositionRef.current.z + boatPositionZ,
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
