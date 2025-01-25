import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap';

import { playerHPAtom } from '../../atoms/battleAtoms';
import { PLAYER_MAX_HP } from '../../constants/constants';
import { HPBarContainer, HPFill } from './HPBar.styles';

export default function HPBar() {
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
}
