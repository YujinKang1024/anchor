import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';

import { isSoundPlayingAtom } from '../../utils/atoms';
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

  useEffect(() => {
    audioRef.current = new Audio('/sounds/ocean-waves.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    if (isSoundPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
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
          <IconLine />
          <IconLine />
          <IconLine />
          <IconLine />
          <IconLine />
          <IconLine />
        </IconWrapper>
      </Container>
    </StyledSoundButton>
  );
}
