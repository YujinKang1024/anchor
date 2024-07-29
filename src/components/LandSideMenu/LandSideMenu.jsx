import { SideMenuContainer, MenuHeader, ButtonImage } from './LandSideMenu.styles';

import arrowImage from '../../assets/images/arrow.png';

export default function LandSideMenu() {
  return (
    <SideMenuContainer>
      <MenuHeader>Develop Island</MenuHeader>
      <ButtonImage src={arrowImage} alt="Arrow Botton" />
    </SideMenuContainer>
  );
}
