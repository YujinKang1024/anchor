import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap/gsap-core';

import { isSoundPlayingAtom } from '../../atoms/audioAtoms';
import {
  StyledSoundButton,
  Container,
  SoundText,
  IconWrapper,
  IconLine,
} from './SoundToggleButton.styles';

export default function SoundToggleButton({ toggleSound }) {
  const [isSoundPlaying] = useAtom(isSoundPlayingAtom);
  const audioRef = useRef(null);
  const linesRef = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/ocean-waves.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    timelineRef.current = gsap.timeline({
      repeat: -1,
      yoyo: true,
      smoothChildTiming: true,
    });

    if (isSoundPlaying) {
      audioRef.current.play();

      const duration = 0.5;
      const minHeight = 10;

      linesRef.current.forEach((line, index) => {
        const maxHeight = 14 + Math.sin(index * 0.5) * 4;
        timelineRef.current
          .to(
            line,
            {
              height: maxHeight,
              duration: duration,
              ease: 'power2.inOut',
            },
            index * (duration / 4),
          )
          .to(
            line,
            {
              height: minHeight,
              duration: duration,
              ease: 'power2.inOut',
            },
            `>-${duration / 2}`,
          );
      });

      timelineRef.current.duration((linesRef.current.length * duration) / 2);
      timelineRef.current.play();
    } else {
      gsap.to(linesRef.current, {
        height: 10,
        duration: 0.5,
        ease: 'power2.out',
      });

      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    }

    return () => {
      audioRef.current.pause();
      audioRef.current = null;

      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isSoundPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isSoundPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isSoundPlaying]);

  return (
    <StyledSoundButton onClick={toggleSound}>
      <Container>
        <SoundText>sound</SoundText>
        <IconWrapper>
          {[...Array(8)].map((_, index) => (
            <IconLine key={index} ref={(el) => (linesRef.current[index] = el)} />
          ))}
        </IconWrapper>
      </Container>
    </StyledSoundButton>
  );
}
