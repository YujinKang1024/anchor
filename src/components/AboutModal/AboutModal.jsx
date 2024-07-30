import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import AnchorImage from '../AnchorImage/AnchorImage';
import { GradientBackground, ModalOverlay } from '../../styled-components/fullScreenModal';
import { TextContainer, Text, HighlightText } from './AboutModal.styles';
import CloseButton from '../../styled-components/CloseButton';

import { isShowAboutModalAtom } from '../../utils/atoms';

export default function AboutModal() {
  const [, setIsShowAboutModal] = useAtom(isShowAboutModalAtom);
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    const contentElement = contentRef.current;
    const imageElement = imageRef.current;

    gsap.set(modalElement, { opacity: 0 });
    gsap.set([contentElement, imageElement], { scale: 0.8, opacity: 0 });

    const tl = gsap.timeline();

    tl.to(modalElement, {
      opacity: 1,
      duration: 0.3,
    }).to(
      [contentElement, imageElement],
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      },
      '-=0.1',
    );
  }, []);

  function handleClickCloseButton() {
    const modalElement = modalRef.current;
    const contentElement = contentRef.current;
    const imageElement = imageRef.current;

    const tl = gsap.timeline();

    tl.to([contentElement, imageElement], {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
    }).to(
      modalElement,
      {
        opacity: 0,
        duration: 0.3,
        onComplete: () => setIsShowAboutModal(false),
      },
      '-=0.1',
    );
  }

  return (
    <ModalOverlay ref={modalRef}>
      <AnchorImage
        ref={imageRef}
        top="100%"
        width="11rem"
        zIndex="2000"
        imageBlur="0"
        applyColorEnhancement="true"
      />
      <GradientBackground ref={contentRef}>
        <CloseButton onClick={handleClickCloseButton} />
        <TextContainer>
          <Text>
            안녕하세요, 프론트엔드 개발자
            <HighlightText color="#006cff"> 강유진</HighlightText>
            입니다.
          </Text>
          <Text>테스트용 임시 글이 출력되고 있습니다.</Text>
          <Text color="#fff" marginTop="5%" fontWeight="600">
            CONTACT
          </Text>
          <Text color="#fff">yujinkang1024@gmail.com</Text>
        </TextContainer>
      </GradientBackground>
    </ModalOverlay>
  );
}
