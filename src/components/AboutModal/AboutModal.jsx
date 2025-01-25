import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap';

import AnchorImage from '../AnchorImage/AnchorImage';
import { GradientBackground, ModalOverlay } from '../../styled-components/fullScreenModal';
import { TextContainer, Text, HighlightText, StyledBR } from './AboutModal.styles';
import CloseButton from '../../styled-components/CloseButton';

import { isShowAboutModalAtom } from '../../atoms/uiStateAtoms';

export default function AboutModal() {
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
          안녕하세요, 주니어 프론트엔드 개발자
          <HighlightText color="#006cff"> 강유진</HighlightText>
          입니다.
        </Text>
        <Text ref={(el) => (textRefs.current[1] = el)}>
          대학교 게임 학과에서 3D 그래픽을 전공하며 여러 번의 게임 개발 프로젝트를 겪었습니다.{' '}
          <StyledBR />그 과정에서 예술적, 개발적 감각을 키워나가며 팀원들과 협업하는 방법에 대해
          익혀나갔습니다.
        </Text>
        <Text ref={(el) => (textRefs.current[2] = el)}>
          그 중 배경 그래픽 팀장으로 개발에 참여한 졸업 작품 {`'여명'`}은 공모전 수상 및 정식 출시를
          통해 사용자들에게 긍정적인 반응을 얻기도 했습니다.
        </Text>
        <Text ref={(el) => (textRefs.current[3] = el)}>
          졸업 이후에는 기능 구현에 대한 흥미와 실용성 있는 서비스 개발에 대한 열망으로 웹 개발을
          시작하게 되었습니다. <StyledBR />
          기획, 그래픽, 개발, 다방면에서의 경험을 살려 동료들과 원활하게 협업하며 완성도 높은
          서비스를 개발해 나가고 싶습니다.
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
        {memoizedContent}
      </GradientBackground>
    </ModalOverlay>
  );
}
