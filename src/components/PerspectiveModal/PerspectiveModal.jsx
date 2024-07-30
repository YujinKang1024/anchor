import { useAtom } from 'jotai';

import YoutubeFrame from '../YouTubeFrame/YouTubeFrame';
import CloseButton from '../../styled-components/CloseButton';
import { ModalBackdrop, StyledPerspectiveDModal } from './PerspectiveModal.styles';
import { isShowPerspectiveModalAtom } from '../../utils/atoms';

export default function PerspectiveModal() {
  const [, setIsShowPerspectiveModal] = useAtom(isShowPerspectiveModalAtom);

  function handleCloseModal(event) {
    event.stopPropagation();
    setIsShowPerspectiveModal(false);
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  return (
    <>
      <ModalBackdrop onClick={handleCloseModal}>
        <StyledPerspectiveDModal onClick={handleModalClick}>
          <h2>포트폴리오 모달</h2>
          <p>정적 ui 테스트</p>
          <CloseButton onClick={handleCloseModal} />
        </StyledPerspectiveDModal>
        <YoutubeFrame videoId="79S_a3bNWxA?si=ACNoC4og4CG3e9fq" />
      </ModalBackdrop>
    </>
  );
}
