import { useRef, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap';

import {
  SideMenuContainer,
  MenuHeader,
  ButtonImage,
  TextContainer,
  ButtonContainer,
  Description,
  DescriptionSmall,
  DescriptionContainer,
} from './LandSideMenu.styles';
import GradientButton from '../GradientButton/GradientButton';
import { isLandMenuOpenAtom, isShowPerspectiveModalAtom } from '../../atoms/uiStateAtoms';
import arrowImage from '../../assets/images/arrow.png';

export default function LandSideMenu() {
  const [isLandMenuOpen, setIsLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [isShowPerspectiveModal, setIsShowPerspectiveModal] = useAtom(isShowPerspectiveModalAtom);
  const [isAnimating, setIsAnimating] = useState(false);

  const menuRef = useRef(null);
  const textContainerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    if (isAnimating || isShowPerspectiveModal) return;

    setIsAnimating(true);
    const newIsOpen = !isLandMenuOpen;
    const textWidth = textContainerRef.current.offsetWidth;

    gsap.to(textContainerRef.current, {
      x: newIsOpen ? 0 : textWidth,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsLandMenuOpen(newIsOpen);
        setIsAnimating(false);
      },
    });

    gsap.to(buttonContainerRef.current, {
      x: newIsOpen ? 0 : textWidth,
      duration: 0.5,
      ease: 'power2.inOut',
    });

    gsap.to(buttonRef.current, {
      rotation: newIsOpen ? 180 : 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  };

  useEffect(() => {
    gsap.set(textContainerRef.current, { x: 0 });
    gsap.set(buttonContainerRef.current, { x: 0 });
    gsap.set(buttonRef.current, { rotation: 180 });
  }, []);

  const handlePortfolioClick = () => {
    setIsShowPerspectiveModal(true);
  };

  return (
    <SideMenuContainer ref={menuRef}>
      <ButtonContainer
        ref={buttonContainerRef}
        onClick={toggleMenu}
        $isShowPerspectiveModal={isShowPerspectiveModal}
      >
        <ButtonImage ref={buttonRef} src={arrowImage} alt="Arrow Button" />
      </ButtonContainer>
      <TextContainer ref={textContainerRef}>
        <MenuHeader>Develop Island</MenuHeader>
        <DescriptionContainer>
          <Description>개발 섬에 오신 것을 환영합니다!</Description>
          <Description>
            이 작은 섬 안에서는 잔디 사이를 누비는 풀벌레마저 자유로울 수 없다고 합니다.
          </Description>
          <Description>
            {`사악한 기계 통치자 '블렌더'의 수하가 자리를 굳건히 지키고 있기 때문이에요.`}
          </Description>
          <Description>
            팽팽한 긴장감 속에서 섬은 자유를 되찾을 날을 묵묵히 기다리고 있습니다.
          </Description>
        </DescriptionContainer>
        <DescriptionSmall>블렌더에 용감히 맞서는 한 영웅,</DescriptionSmall>
        <DescriptionSmall>{`'마야'의 이야기는 포트폴리오에서 확인하실 수 있습니다!`}</DescriptionSmall>
        <GradientButton startColor="#fbc2eb" endColor="#a6c1ee" onClick={handlePortfolioClick}>
          P O R T F O L I O
        </GradientButton>
      </TextContainer>
    </SideMenuContainer>
  );
}
