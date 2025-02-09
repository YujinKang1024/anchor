import { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { gsap } from 'gsap/gsap-core';

import { isOnBattleAtom, isEnterIslandAtom, monsterHPAtom } from '@/domains/island/atoms';
import {
  isLandMenuOpenAtom,
  isShowAboutModalAtom,
  isShowPerspectiveModalAtom,
  isShowSoldOutMessageAtom,
  isSoundPlayingAtom,
} from '@/atoms';

import { HPBar } from '@/domains/island/gameLand';
import { LandSideMenu } from '@/domains/island/ui';
import { BaseButton, SoundToggleButton, EnterIslandButton } from '@/shared/components/Buttons';
import { PerspectiveModal, AboutModal } from '@/shared/components/Modals';
import { ToastMessage } from '@/shared/components/Utils';
import { BattleMessage, VictoryMessage } from '@/shared/components/UI/Messages';
import { BackIconButton } from '@/shared/components/UI/Buttons';
import { MouseFollowerUI } from '@/domains/island/gameLand';

import backIcon from '@/assets/images/back-icon.png';

export const Scene3DUI = () => {
  const [isShowAboutModal, setIsShowAboutModal] = useAtom(isShowAboutModalAtom);
  const [isSoundPlaying, setIsSoundPlaying] = useAtom(isSoundPlayingAtom);
  const [isOnBattle, setIsOnBattle] = useAtom(isOnBattleAtom);
  const [isEnterIsland, setIsEnterIsland] = useAtom(isEnterIslandAtom);
  const [, setIsLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [isShowSoldOutMessage] = useAtom(isShowSoldOutMessageAtom);
  const [isShowPerspectiveModal] = useAtom(isShowPerspectiveModalAtom);
  const [monsterHP] = useAtom(monsterHPAtom);

  const [showBattleMessage, setShowBattleMessage] = useState(false);
  const [showVictoryMessage, setShowVictoryMessage] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);

  const battleMessageRef = useRef(null);
  const victoryMessageRef = useRef(null);

  useEffect(() => {
    if (isOnBattle && monsterHP > 0) {
      setShowBattleMessage(true);
      setShowVictoryMessage(false);
    } else if (isOnBattle && monsterHP <= 0) {
      setShowBattleMessage(false);
      setShowVictoryMessage(true);

      const timer = setTimeout(() => {
        setIsOnBattle(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOnBattle, monsterHP, setIsOnBattle]);

  useEffect(() => {
    if (!isOnBattle) {
      setShowBattleMessage(false);
      setShowVictoryMessage(false);
    }
  }, [isOnBattle]);

  useEffect(() => {
    if (battleMessageRef.current) {
      if (showBattleMessage) {
        gsap.to(battleMessageRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.to(battleMessageRef.current, {
          x: '+=5',
          yoyo: true,
          repeat: -1,
          duration: 0.1,
          ease: 'none',
        });
      } else {
        gsap.to(battleMessageRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        });
      }
    }
  }, [showBattleMessage]);

  useEffect(() => {
    if (victoryMessageRef.current) {
      if (showVictoryMessage) {
        gsap.to(victoryMessageRef.current, {
          opacity: 1,
          scale: 1.2,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
          onComplete: () => {
            gsap.to(victoryMessageRef.current, {
              opacity: 0,
              scale: 1,
              duration: 1,
              delay: 2,
              ease: 'power2.in',
            });
          },
        });
      } else {
        gsap.set(victoryMessageRef.current, { opacity: 0, scale: 1 });
      }
    }
  }, [showVictoryMessage]);

  function handleClickBackButton(event) {
    event.stopPropagation();
    if (isShowPerspectiveModal) return;
    if (isOnBattle) {
      setShowWarningMessage(true);
      setTimeout(() => setShowWarningMessage(false), 2000);
    } else if (!isShowPerspectiveModal) {
      setIsEnterIsland(false);
      setIsLandMenuOpen(false);
    }
  }

  function handleClickAboutButton() {
    setIsShowAboutModal(true);
  }

  function toggleSound() {
    setIsSoundPlaying(!isSoundPlaying);
  }

  return (
    <>
      {!isEnterIsland && (
        <>
          <BaseButton top="4%" right="4%" onClick={handleClickAboutButton}>
            About
          </BaseButton>
          <EnterIslandButton />
        </>
      )}
      {isShowAboutModal && <AboutModal />}
      {isEnterIsland && (
        <>
          <LandSideMenu />
          <BackIconButton src={backIcon} onClick={handleClickBackButton} />
        </>
      )}
      {showWarningMessage && (
        <ToastMessage
          message="전투 중에는 벗어날 수 없습니다!"
          backgroundColor="rgba(255, 0, 0, 0.7)"
          duration={2}
        />
      )}
      {isShowSoldOutMessage && (
        <ToastMessage
          message="음료수가 품절되었습니다!"
          backgroundColor="rgba(0, 0, 0, 0.7)"
          duration={2}
          textColor="#fff"
        />
      )}
      {isShowPerspectiveModal && <PerspectiveModal />}
      {isOnBattle && (
        <>
          <HPBar />
          <MouseFollowerUI />
        </>
      )}
      <BattleMessage ref={battleMessageRef}>{showBattleMessage && 'PRESS SPACEBAR!'}</BattleMessage>
      <VictoryMessage ref={victoryMessageRef}>
        {showVictoryMessage && "YOU'RE HERO!"}
      </VictoryMessage>
      <SoundToggleButton toggleSound={toggleSound} />
    </>
  );
};
