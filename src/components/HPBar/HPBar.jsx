import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import { HPBarContainer, HPFill } from './HPBar.styles';

export default function HPBar({ hp, maxHp }) {
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
        width: `${(hp / maxHp) * 100}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [hp, maxHp]);

  return (
    <HPBarContainer ref={containerRef}>
      <HPFill ref={fillRef} />
    </HPBarContainer>
  );
}
