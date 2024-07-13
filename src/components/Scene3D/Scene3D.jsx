import Scene3DUI from '../Scene3DUI/Scene3DUI';
import { Container, StyledCanvas } from './Scene3D.styles';

export default function Scene3D() {
  return (
    <Container>
      <Scene3DUI />
      <StyledCanvas camera={{ position: [0, 0, 9], fov: 25 }}>
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ambientLight intensity={0.5} />
      </StyledCanvas>
    </Container>
  );
}
