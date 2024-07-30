import { useState } from 'react';
import { useAtom } from 'jotai';

import {
  isOnBattleAtom,
  isEnterIslandAtom,
  isLandMenuOpenAtom,
  isShowPerspectiveModalAtom,
  isShowAboutModalAtom,
  isShowLandingUIAtom,
} from '../../utils/atoms';

import BaseButton from '../BaseButton/BaseButton';
import LandingUI from '../LandingUI/LandingUI';
import SoundToggleButton from '../SoundToggleButton/SoundToggleButton';
import EnterIslandButton from '../EnterIslandButton/EnterIslandButton';
import HPBar from '../HPBar/HPBar';
import LandSideMenu from '../LandSideMenu/LandSideMenu';
import PerspectiveModal from '../PerspectiveModal/PerspectiveModal';
import WarningMessage from '../WarningMessage/WarningMessage';
import { BackIconButton } from '../../styled-components/BackIcon';
import AboutModal from '../AboutModal/AboutModal';

import backIcon from '../../assets/images/back-icon.png';

export default function Scene3DUI() {
  const [showWarning, setShowWarning] = useState(false);
  const [isShowLandingUI, setIsShowLandingUI] = useAtom(isShowLandingUIAtom);
  const [isShowAboutModal, setIsShowAboutModal] = useAtom(isShowAboutModalAtom);
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const [isEnterIsland, setIsEnterIsland] = useAtom(isEnterIslandAtom);
  const [, setIsLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [isShowPerspectiveModal] = useAtom(isShowPerspectiveModalAtom);

  function handleStartButtonClick() {
    setIsShowLandingUI(false);
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
      {showWarning && <WarningMessage message="전투 중에는 벗어날 수 없습니다!" />}
      {isShowPerspectiveModal && <PerspectiveModal />}
      {isOnBattle && <HPBar />}
      <SoundToggleButton />
    </>
  );
}
