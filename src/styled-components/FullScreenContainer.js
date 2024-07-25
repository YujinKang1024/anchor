import styled from 'styled-components';

const FullScreenContainer = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  pointer-events: none;
`;

export default FullScreenContainer;
