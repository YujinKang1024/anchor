import AnchorImage from '../AnchorImage/AnchorImage';
import {
  ModalOverlay,
  ModalContent,
  TextContainer,
  Text,
  HighlightText,
} from './AboutModal.styles';
import CloseButton from '../../styled-components/CloseButton';

export default function AboutModal() {
  return (
    <ModalOverlay>
      <AnchorImage
        top="78%"
        width="11rem"
        zIndex="6"
        imageBlur="0"
        applyColorEnhancement="true"
      />
      <ModalContent>
        <CloseButton />
        <TextContainer>
          <Text>
            안녕하세요, 프론트엔드 개발자
            <HighlightText color="#006cff"> 강유진</HighlightText>
            입니다.
          </Text>
          <Text>테스트용 임시 글이 출력되고 있습니다.</Text>
          <Text color="#fff" marginTop="5%" fontWeight="600">
            CONTACT
          </Text>
          <Text color="#fff">yujinkang1024@gmail.com</Text>
        </TextContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
