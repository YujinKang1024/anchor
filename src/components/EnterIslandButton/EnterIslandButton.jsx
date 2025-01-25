import { useRef, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

import { isEnterIslandAtom } from '../../atoms/gameStateAtoms';
import { isLandMenuOpenAtom } from '../../atoms/uiStateAtoms';

import { useInteractionZone } from '../../hooks/useInteractionZone';
import { ButtonContainer, ButtonImage, ButtonText } from './EnterIslandButton.styles';

import anchorIconImage from '../../assets/images/anchor-white.png';

gsap.registerPlugin(CSSPlugin);

export default function EnterIslandButton() {
  const [, setIsLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnterIsland, setIsEnterIsland] = useAtom(isEnterIslandAtom);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  const isInInteractionZone = useInteractionZone();

  useEffect(() => {
    let animation;
    if (isInInteractionZone) {
      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          visibility: 'visible',
          opacity: 0,
          scale: 0.5,
          y: 30,
        });
        animation = gsap.to(buttonRef.current, {
          duration: 1.0,
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power2.out',
          onStart: () => setIsVisible(true),
        });
      }
    } else {
      if (buttonRef.current) {
        animation = gsap.to(buttonRef.current, {
          duration: 0.5,
          opacity: 0,
          scale: 0.2,
          y: 30,
          ease: 'power2.in',
          onComplete: () => {
            setIsVisible(false);
            gsap.set(buttonRef.current, { visibility: 'hidden' });
          },
        });
      }
    }

    return () => {
      if (animation) animation.kill();
    };
  }, [isInInteractionZone]);

  useEffect(() => {
    if (!imageRef.current) return;

    const shakeAnimation = gsap.to(imageRef.current, {
      rotation: 5,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      paused: true,
    });

    return () => {
      shakeAnimation.kill();
    };
  }, []);

  function handleClickEnterButton() {
    setIsEnterIsland(true);
    setIsVisible(false);
    setIsLandMenuOpen(true);
    console.log(isEnterIsland);
  }

  return (
    <ButtonContainer
      ref={buttonRef}
      $isVisible={isVisible}
      onClick={handleClickEnterButton}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <ButtonImage ref={imageRef} src={anchorIconImage} alt="Enter Island" />
      <ButtonText>Enter Island</ButtonText>
    </ButtonContainer>
  );
}
