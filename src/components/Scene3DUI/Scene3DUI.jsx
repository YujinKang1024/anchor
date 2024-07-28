import GradientButton from '../GradientButton/GradientButton';
import BaseButton from '../BaseButton/BaseButton';
import Title from '../Title/Title';
import AnchorImage from '../AnchorImage/AnchorImage';
import SoundToggleButton from '../SoundToggleButton/SoundToggleButton';
import EnterIslandButton from '../EnterIslandButton/EnterIslandButton';

export default function Scene3DUI({ isShowLandingUI, setIsShowLandingUI }) {
  function toggleLandingUI() {
    setIsShowLandingUI(!isShowLandingUI);
  }

  return (
    <>
      {isShowLandingUI && (
        <>
          <Title>ANCHOR</Title>
          <AnchorImage />
          <GradientButton startColor="#fbc2eb" endColor="#a6c1ee">
            P O R T F O L I O
          </GradientButton>
          <BaseButton bottom="28%" toggleLandingUI={toggleLandingUI}>
            Weigh Anchor
          </BaseButton>
        </>
      )}
      <BaseButton top="4%" right="4%">
        About
      </BaseButton>
      <EnterIslandButton />
      <SoundToggleButton />
    </>
  );
}
