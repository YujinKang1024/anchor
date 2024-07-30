import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { StyledTitle } from './LandingUI.styles';

import AnchorImage from '../AnchorImage/AnchorImage';
import BaseButton from '../BaseButton/BaseButton';
import {
  ModalContent,
  GradientBackground,
  ModalOverlay,
} from '../../styled-components/fullScreenModal';

export default function LandingUI({ onStartButtonClick }) {
  const anchorRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const backgroundRef = useRef(null);

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
    await animateOut();
    onStartButtonClick();
  }, [animateOut, onStartButtonClick]);

  return (
    <ModalOverlay>
      <GradientBackground ref={backgroundRef}>
        <ModalContent ref={contentRef}>
          <StyledTitle ref={titleRef}>ANCHOR</StyledTitle>
          <AnchorImage ref={anchorRef} />
          <BaseButton ref={buttonRef} bottom="20%" onClick={handleStartButtonClick}>
            Weigh Anchor
          </BaseButton>
        </ModalContent>
      </GradientBackground>
    </ModalOverlay>
  );
}
