import styled from 'styled-components';

const BlockerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  z-index: 9999;
`;

const Message = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
`;

export default function MobileBlocker() {
  return (
    <BlockerWrapper>
      <Message>
        모바일 기기에서는 이 웹사이트를 이용할 수 없습니다. 데스크톱으로 접속해 주세요.
      </Message>
    </BlockerWrapper>
  );
}
