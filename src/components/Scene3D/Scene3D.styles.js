import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const StyledCanvas = styled(Canvas)`
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    #fff 0%,
    #f5f9ff 10%,
    #bed9ff 40%,
    #569dff 100%
  );
`;
