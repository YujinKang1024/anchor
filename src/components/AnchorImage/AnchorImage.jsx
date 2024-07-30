import { forwardRef } from 'react';
import { StyledImage, AnchorContainer } from './AnchorImage.styles';
import anchor from '../../assets/images/anchor.png';

const AnchorImage = forwardRef(
  ({ top, width, zIndex, imageBlur, applyColorEnhancement, marginTop }, ref) => {
    return (
      <AnchorContainer ref={ref} $marginTop={marginTop} $zIndex={zIndex}>
        <StyledImage
          $top={top}
          $width={width}
          $imageBlur={imageBlur}
          $applyColorEnhancement={applyColorEnhancement}
          src={anchor}
          alt="Anchor"
        />
      </AnchorContainer>
    );
  },
);

AnchorImage.displayName = 'AnchorImage';

export default AnchorImage;
