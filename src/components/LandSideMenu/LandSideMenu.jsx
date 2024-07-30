import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {
  SideMenuContainer,
  MenuHeader,
  ButtonImage,
  TextContainer,
  ButtonContainer,
} from './LandSideMenu.styles';
import arrowImage from '../../assets/images/arrow.png';

export default function LandSideMenu() {
  const [, setIsOpen] = useState(true);
  const menuRef = useRef(null);
  const textContainerRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;

      const textWidth = textContainerRef.current.offsetWidth;

      gsap.to(textContainerRef.current, {
        x: newIsOpen ? textWidth : 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      gsap.to(buttonContainerRef.current, {
        x: newIsOpen ? textWidth : 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      gsap.to(buttonRef.current, {
        rotation: newIsOpen ? 0 : 180,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      return newIsOpen;
    });
  };

  useEffect(() => {
    gsap.set(textContainerRef.current, { x: 0 });
    gsap.set(buttonContainerRef.current, { x: 0 });
    gsap.set(buttonRef.current, { rotation: 180 });
  }, []);

  return (
    <SideMenuContainer ref={menuRef}>
      <ButtonContainer ref={buttonContainerRef} onClick={toggleMenu}>
        <ButtonImage ref={buttonRef} src={arrowImage} alt="Arrow Button" />
      </ButtonContainer>
      <TextContainer ref={textContainerRef}>
        <MenuHeader>Develop Island</MenuHeader>
      </TextContainer>
    </SideMenuContainer>
  );
}
