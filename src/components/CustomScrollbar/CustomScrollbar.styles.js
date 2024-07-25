import styled from 'styled-components';
import { VIRTUAL_SCROLL_HEIGHT, SCROLLBAR_HEIGHT_RATIO } from '../../constants/constants';

export const ScrollContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  pointer-events: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  z-index: 10;
`;

export const VirtualContent = styled.div`
  height: ${VIRTUAL_SCROLL_HEIGHT}px;
  width: 100%;
`;

export const Scrollbar = styled.div`
  height: ${SCROLLBAR_HEIGHT_RATIO * 100}%;
  position: fixed;
  right: 0.5%;
  width: 0.4rem;
  height: 97%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.3rem;
  z-index: 11;
`;

export const Thumb = styled.div.attrs(({ $scrolltop }) => ({
  style: {
    top: `${Math.min($scrolltop, 97)}%`,
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
