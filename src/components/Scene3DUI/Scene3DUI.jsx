import { useState } from 'react';
import { useAtom } from 'jotai';

import {
  isOnBattleAtom,
  isEnterIslandAtom,
  isLandMenuOpenAtom,
  isShowPerspectiveModalAtom,
  isShowAboutModalAtom,
  isShowLandingUIAtom,
  isSoundPlayingAtom,
  isShowSoldOutMessageAtom,
} from '../../utils/atoms';

import BaseButton from '../BaseButton/BaseButton';
import LandingUI from '../LandingUI/LandingUI';
import SoundToggleButton from '../SoundToggleButton/SoundToggleButton';
import EnterIslandButton from '../EnterIslandButton/EnterIslandButton';
import HPBar from '../HPBar/HPBar';
import LandSideMenu from '../LandSideMenu/LandSideMenu';
import PerspectiveModal from '../PerspectiveModal/PerspectiveModal';
import PopupMessage from '../PopupMessage/PopupMessage';
import { BackIconButton } from '../../styled-components/BackIcon';
import AboutModal from '../AboutModal/AboutModal';

import backIcon from '../../assets/images/back-icon.png';

export default function Scene3DUI() {
  const [showWarning, setShowWarning] = useState(false);
  const [isShowLandingUI, setIsShowLandingUI] = useAtom(isShowLandingUIAtom);
  const [isShowAboutModal, setIsShowAboutModal] = useAtom(isShowAboutModalAtom);
  const [isSoundPlaying, setIsSoundPlaying] = useAtom(isSoundPlayingAtom);
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const [isEnterIsland, setIsEnterIsland] = useAtom(isEnterIslandAtom);
  const [, setIsLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [isShowSoldOutMessage] = useAtom(isShowSoldOutMessageAtom);
  const [isShowPerspectiveModal] = useAtom(isShowPerspectiveModalAtom);

  function handleStartButtonClick() {
    setIsShowLandingUI(false);
    setIsSoundPlaying(true);
  }

  function handleClickBackButton(event) {
    event.stopPropagation();
    if (isShowPerspectiveModal) return;
    if (isOnBattle) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 2000);
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
      {isShowLandingUI && <LandingUI onStartButtonClick={handleStartButtonClick} />}
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
      {showWarning && (
        <PopupMessage
          message="전투 중에는 벗어날 수 없습니다!"
          backgroundColor="rgba(255, 0, 0, 0.7)"
          duration={2}
        />
      )}
      {isShowSoldOutMessage && (
        <PopupMessage
          message="음료수가 품절되었습니다!"
          backgroundColor="rgba(0, 0, 0, 0.7)"
          duration={2}
          textColor="#fff"
        />
      )}
      {isShowPerspectiveModal && <PerspectiveModal />}
      {isOnBattle && <HPBar />}
      <SoundToggleButton toggleSound={toggleSound} />
    </>
  );
}
