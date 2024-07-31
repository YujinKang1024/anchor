import { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import styled from 'styled-components';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';

const HPBarContainer = styled.div`
  width: 400px;
  height: 40px;
  background-color: #333;
  border-radius: 20px;
  overflow: hidden;
  transform: translate(-50%, -50%);
`;

const HPFill = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;

export default function MonsterHPBar({ hp, monsterRef }) {
  const fillRef = useRef();
  const containerRef = useRef();
  const groupRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
      );
    }
  }, []);

  useEffect(() => {
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        width: `${hp}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [hp]);

  useFrame(() => {
    if (groupRef.current && monsterRef.current) {
      const monsterPosition = monsterRef.current.position;
      groupRef.current.position.set(monsterPosition.x, monsterPosition.y + 25, monsterPosition.z);
    }
  });

  return (
    <group ref={groupRef}>
      <Html
        transform
        distanceFactor={20}
        style={{
          width: '400px',
          height: '40px',
          zIndex: 3000,
        }}
      >
        <HPBarContainer ref={containerRef}>
          <HPFill ref={fillRef} style={{ width: `${hp}%` }} />
        </HPBarContainer>
      </Html>
    </group>
  );
}
