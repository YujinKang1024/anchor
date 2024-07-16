import YoutubeFrame from '../YouTubeFrame/YouTubeFrame';
import CloseButton from '../../styled-components/CloseButton';
import { ModalBackdrop, StyledPerspectiveDModal } from './PerspectiveModal.styles';

export default function PerspectiveModal() {
  return (
    <>
      <ModalBackdrop>
        <StyledPerspectiveDModal>
          <h2>포트폴리오 모달</h2>
          <p>정적 ui 테스트</p>
          <CloseButton />
        </StyledPerspectiveDModal>
        <YoutubeFrame videoId="79S_a3bNWxA?si=ACNoC4og4CG3e9fq" />
      </ModalBackdrop>
    </>
  );
}
