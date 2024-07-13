import { Container, StyledCanvas } from './Scene3D.styles';
import BaseButton from '../BaseButton/BaseButton';
import Title from '../Title/Title';
import AnchorImage from '../AnchorImage/AnchorImage';
import SoundToggleButton from '../SoundToggleButton/SoundToggleButton';
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar';
import GradientButton from '../GradientButton/GradientButton';

export default function Scene3D() {
  return (
    <Container>
      <CustomScrollbar />
      <GradientButton startColor="#fbc2eb" endColor="#a6c1ee">
        P O R T F O L I O
      </GradientButton>
      <BaseButton bottom="28%">Weigh Anchor</BaseButton>
      <BaseButton top="4%" right="4%">
        About
      </BaseButton>
      <Title>ANCHOR</Title>
      <AnchorImage />
      <SoundToggleButton />
      <StyledCanvas />
    </Container>
  );
}
