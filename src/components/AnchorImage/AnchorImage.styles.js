import styled from 'styled-components';

export const StyledImage = styled.img`
  position: absolute;
  width: ${({ width = '28rem' }) => `${width}`};
  top: ${({ top = '6%' }) => `${top}`};
  z-index: ${({ zIndex = 1 }) => `${zIndex}`};
  filter: ${({ imageBlur = '3px', applyColorEnhancement }) =>
    `blur(${imageBlur}) ${applyColorEnhancement ? 'brightness(0.7) contrast(1.8) saturate(1.5)' : ''}`};
`;
