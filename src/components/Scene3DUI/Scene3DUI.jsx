import { useState } from 'react';
import { useAtom } from 'jotai';

import {
  isOnBattleAtom,
  isEnterIslandAtom,
  isLandMenuOpenAtom,
  isShowPerspectiveModalAtom,
  isShowAboutModalAtom,
} from '../../utils/atoms';

import BaseButton from '../BaseButton/BaseButton';
import Title from '../Title/Title';
import AnchorImage from '../AnchorImage/AnchorImage';
import SoundToggleButton from '../SoundToggleButton/SoundToggleButton';
import EnterIslandButton from '../EnterIslandButton/EnterIslandButton';
import HPBar from '../HPBar/HPBar';
import LandSideMenu from '../LandSideMenu/LandSideMenu';
import PerspectiveModal from '../PerspectiveModal/PerspectiveModal';
import WarningMessage from '../WarningMessage/WarningMessage';
import { BackIconButton } from '../../styled-components/BackIcon';
import AboutModal from '../AboutModal/AboutModal';

import backIcon from '../../assets/images/back-icon.png';

export default function Scene3DUI({ isShowLandingUI, setIsShowLandingUI }) {
  const [showWarning, setShowWarning] = useState(false);
  const [isShowAboutModal, setIsShowAboutModal] = useAtom(isShowAboutModalAtom);
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const [isEnterIsland, setIsEnterIsland] = useAtom(isEnterIslandAtom);
  const [, setIsLandMenuOpen] = useAtom(isLandMenuOpenAtom);
  const [isShowPerspectiveModal] = useAtom(isShowPerspectiveModalAtom);

  function toggleLandingUI() {
    setIsShowLandingUI(!isShowLandingUI);
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
      {isShowLandingUI && (
        <>
          <Title>ANCHOR</Title>
          <AnchorImage />
          <BaseButton bottom="28%" toggleLandingUI={toggleLandingUI}>
            Weigh Anchor
          </BaseButton>
        </>
      )}
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
