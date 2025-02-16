import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap';

import { isShowAboutModalAtom } from '@/atoms';

import { GradientBackground } from '@/shared/components/UI/Background';
import { FullScreenOverlayContainer, Spacing } from '@/shared/components/UI/Layout';
import { CloseButton } from '@/shared/components/UI/Buttons';
import { AnchorImage } from '@/shared/components/Image';

import { TextContainer, Text, HighlightText } from './AboutModal.styles';

export const AboutModal = () => {
  const [isShowAboutModal, setIsShowAboutModal] = useAtom(isShowAboutModalAtom);
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const textRefs = useRef([]);

  const handleClickCloseButton = useCallback(() => {
    const modalElement = modalRef.current;
    const contentElement = contentRef.current;
    const imageElement = imageRef.current;

    gsap.to(textRefs.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
    });

    gsap.to([contentElement, imageElement], {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
    });

    gsap.to(modalElement, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setIsShowAboutModal(false),
    });
  }, [setIsShowAboutModal]);

  useEffect(() => {
    if (!isShowAboutModal) return;

    const modalElement = modalRef.current;
    const contentElement = contentRef.current;
    const imageElement = imageRef.current;

    gsap.set(modalElement, { opacity: 0 });
    gsap.set([contentElement, imageElement], { scale: 0.8, opacity: 0 });
    gsap.set(textRefs.current, { y: 20, opacity: 0 });

    gsap.to(modalElement, {
      opacity: 1,
      duration: 0.3,
    });

    gsap.to([contentElement, imageElement], {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: 0.1,
    });

    gsap.to(textRefs.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, [isShowAboutModal]);

  const memoizedContent = useMemo(
    () => (
      <TextContainer>
        <Text ref={(el) => (textRefs.current[0] = el)}>
          안녕하세요! <Spacing /> 흐름을 정리하고, 더 나은 경험을 만드는 개발자
          <HighlightText color="#006cff"> 강유진</HighlightText>
          입니다.
        </Text>
        <Text ref={(el) => (textRefs.current[1] = el)}>
          어떤 시스템이든 패턴을 찾아 정리하는 걸 좋아합니다.
          <Spacing />
          복잡한 구조를 깔끔하게 정리하고 기능을 더 효율적으로 개선하는 것에서 보람을 느낍니다.
        </Text>
        <Text ref={(el) => (textRefs.current[2] = el)}>
          동시에 사용자 경험을 더욱 직관적이고 매끄럽게 만드는 것에도 관심이 많습니다.
          <Spacing />
          단순히 기능을 구현하는 것을 넘어, 더 편리하고 유용한 흐름을 설계하는 것이 중요하다고
          생각합니다.
        </Text>
        <Text ref={(el) => (textRefs.current[3] = el)}>
          개발을 통해 팀과 프로덕션이 더 원활하게 돌아가도록 기여하고 <Spacing />그 과정에서 저도
          계속 배우고 성장하는 개발자가 되고 싶습니다!
        </Text>
        <Text ref={(el) => (textRefs.current[4] = el)} color="#fff" marginTop="5%" fontWeight="600">
          CONTACT
        </Text>
        <Text ref={(el) => (textRefs.current[5] = el)} color="#fff">
          yujinkang1024@gmail.com
        </Text>
      </TextContainer>
    ),
    [],
  );

  if (!isShowAboutModal) return null;

  return (
    <FullScreenOverlayContainer ref={modalRef}>
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
        {memoizedContent}
      </GradientBackground>
    </FullScreenOverlayContainer>
  );
};
