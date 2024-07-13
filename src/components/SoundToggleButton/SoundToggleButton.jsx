import { useState } from 'react';
import {
  StyledSoundButton,
  Container,
  SoundText,
  IconWrapper,
  IconLine,
} from './SoundToggleButton.styles';

export default function SoundToggleButton() {
  const [isSoundPlaying, setIsSoundPlaying] = useState(true);

  function toggleSound() {
    setIsSoundPlaying(!isSoundPlaying);
  }

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
