import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { StyledTitle } from './LandingUI.styles';

import AnchorImage from '../AnchorImage/AnchorImage';
import BaseButton from '../BaseButton/BaseButton';
import {
  ModalContent,
  GradientBackground,
  ModalOverlay,
} from '../../styled-components/fullScreenModal';

const LandingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  opacity: 0;
`;

export default function LandingUI({ onStartButtonClick }) {
  const anchorRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const backgroundRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
    });
  }, []);

  const animateIn = useCallback(() => {
    const tl = gsap.timeline();

    tl.set(anchorRef.current, { yPercent: -150, opacity: 0 })
      .set([titleRef.current, buttonRef.current], { opacity: 0 })
      .to(anchorRef.current, {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
      })
      .to(
        [titleRef.current, buttonRef.current],
        {
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power1.inOut',
        },
        '-=0.7',
      );
  }, []);

  const animateOut = useCallback(() => {
    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: resolve,
      });

      tl.to([titleRef.current, buttonRef.current], {
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
      })
        .to(
          anchorRef.current,
          {
            yPercent: -150,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.in',
          },
          '-=0.5',
        )
        .to(
          contentRef.current,
          {
            opacity: 0,
            duration: 0.5,
          },
          '-=0.5',
        )
        .to(
          backgroundRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: 'power1.inOut',
          },
          '-=0.5',
        );
    });
  }, []);

  useEffect(() => {
    animateIn();
  }, [animateIn]);

  const handleStartButtonClick = useCallback(async () => {
    const effectAudio = new Audio('/sounds/boat-horn.mp3');
    effectAudio.volume = 0.4;
    effectAudio.play();

    await animateOut();
    onStartButtonClick();
  }, [animateOut, onStartButtonClick]);

  return (
    <LandingOverlay ref={overlayRef} data-testid="landing-ui">
      <ModalOverlay>
        <GradientBackground ref={backgroundRef}>
          <ModalContent ref={contentRef}>
            <StyledTitle ref={titleRef}>ANCHOR</StyledTitle>
            <AnchorImage ref={anchorRef} marginTop="-55vh" zIndex={1} />
            <BaseButton ref={buttonRef} bottom="20%" onClick={handleStartButtonClick}>
              Weigh Anchor
            </BaseButton>
          </ModalContent>
        </GradientBackground>
      </ModalOverlay>
    </LandingOverlay>
  );
}
