import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap';
import styled from 'styled-components';

import { PLAYER_MAX_HP } from '@/domains/island/gameLand';
import { playerHPAtom } from '@/domains/island/atoms/battleAtoms';

const HPBarContainer = styled.div`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 35%;
  height: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  opacity: 0;
  display: flex;
  align-items: center;
  padding: 3px;
`;

const HPFill = styled.div`
  height: 100%;
  width: ${({ $playerHP = 100 }) => `${$playerHP}%`};
  background-color: #ff4136;
  border-radius: 8px;
`;

export const HPBar = () => {
  const [playerHP] = useAtom(playerHPAtom);
  const containerRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && fillRef.current) {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(fillRef.current, {
        width: `${(playerHP / PLAYER_MAX_HP) * 100}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [playerHP]);

  return (
    <HPBarContainer ref={containerRef}>
      <HPFill ref={fillRef} $playerHP={playerHP} />
    </HPBarContainer>
  );
};
