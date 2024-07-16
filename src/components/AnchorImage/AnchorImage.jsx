import { StyledImage } from './AnchorImage.styles';
import anchor from '../../assets/images/anchor.png';

export default function AnchorImage({ top, width, zIndex, imageBlur, applyColorEnhancement }) {
  return (
    <StyledImage
      top={top}
      width={width}
      zIndex={zIndex}
      imageBlur={imageBlur}
      applyColorEnhancement={applyColorEnhancement}
      src={anchor}
      alt="Anchor"
    />
  );
}
