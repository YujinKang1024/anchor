import { useAtom } from 'jotai';

import { isOnBattleAtom, isEnterIslandAtom } from '../../utils/atoms';

import BaseButton from '../BaseButton/BaseButton';
import Title from '../Title/Title';
import AnchorImage from '../AnchorImage/AnchorImage';
import SoundToggleButton from '../SoundToggleButton/SoundToggleButton';
import EnterIslandButton from '../EnterIslandButton/EnterIslandButton';
import HPBar from '../HPBar/HPBar';
import LandSideMenu from '../LandSideMenu/LandSideMenu';

export default function Scene3DUI({ isShowLandingUI, setIsShowLandingUI }) {
  const [isOnBattle] = useAtom(isOnBattleAtom);
  const [isEnterIsland] = useAtom(isEnterIslandAtom);

  function toggleLandingUI() {
    setIsShowLandingUI(!isShowLandingUI);
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
          <BaseButton top="4%" right="4%">
            About
          </BaseButton>
          <EnterIslandButton />
        </>
      )}
      {isEnterIsland && <LandSideMenu />}
      {isOnBattle && (
        <>
          <HPBar />
        </>
      )}
      <SoundToggleButton />
    </>
  );
}
