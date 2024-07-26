import styled from 'styled-components';

export const Scrollbar = styled.div`
  position: fixed;
  top: 1.5%;
  right: 0.5%;
  width: 0.4rem;
  height: 97%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.3rem;
  z-index: 1000;
  pointer-events: auto;
`;

export const Thumb = styled.div.attrs(({ $scrolltop }) => ({
  style: {
    top: `${Math.min($scrolltop, 88)}%`,
  },
}))`
  position: absolute;
  left: 0;
  width: 100%;
  height: 12%;
  background: #88bfff;
  border-radius: 0.3rem;
  cursor: pointer;
`;
