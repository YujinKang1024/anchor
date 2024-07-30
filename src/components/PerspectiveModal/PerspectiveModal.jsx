import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import YoutubeFrame from '../YouTubeFrame/YouTubeFrame';
import CloseButton from '../../styled-components/CloseButton';
import { ModalBackdrop, StyledPerspectiveDModal } from './PerspectiveModal.styles';
import { isShowPerspectiveModalAtom } from '../../utils/atoms';

export default function PerspectiveModal() {
  const [, setIsShowPerspectiveModal] = useAtom(isShowPerspectiveModalAtom);
  const modalRef = useRef(null);
  const youtubeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const modalElement = modalRef.current;
    const youtubeElement = youtubeRef.current;

    gsap.set([modalElement, youtubeElement], {
      opacity: 0,
      scale: 0.8,
      y: 20,
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(modalElement, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
    }).to(
      youtubeElement,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
      },
      '-=0.3',
    );
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        rotateY: isHovered ? '18deg' : '30deg',
        rotateX: isHovered ? '2deg' : '4deg',
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);

  function handleCloseModal(event) {
    event.stopPropagation();

    const modalElement = modalRef.current;
    const youtubeElement = youtubeRef.current;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.in' },
      onComplete: () => setIsShowPerspectiveModal(false),
    });

    tl.to(youtubeElement, {
      opacity: 0,
      scale: 0.8,
      y: 20,
      duration: 0.5,
    }).to(
      modalElement,
      {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.5,
      },
      '-=0.15',
    );
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  return (
    <ModalBackdrop onClick={handleCloseModal}>
      <StyledPerspectiveDModal
        ref={modalRef}
        onClick={handleModalClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2>포트폴리오 모달</h2>
        <p>정적 ui 테스트</p>
        <CloseButton onClick={handleCloseModal} />
      </StyledPerspectiveDModal>
      <YoutubeFrame ref={youtubeRef} videoId="79S_a3bNWxA?si=ACNoC4og4CG3e9fq" />
    </ModalBackdrop>
  );
}
