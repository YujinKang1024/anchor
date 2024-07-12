import { Container, StyledCanvas } from './Scene3D.styles';
import Button from '../Button/Button';
import Title from '../Title/Title';
import LargeAnchorImage from '../LargeAnchorImage/LargeAnchorImage';

export default function Scene3D() {
  return (
    <Container>
      <Button>Weigh Anchor</Button>
      <Title>ANCHOR</Title>
      <LargeAnchorImage />
      <StyledCanvas />
    </Container>
  );
}
