import { useAtom } from 'jotai';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import YoutubeFrame from '../YouTubeFrame/YouTubeFrame';
import CloseButton from '../../styled-components/CloseButton';
import { ModalBackdrop, StyledPerspectiveDModal } from './PerspectiveModal.styles';
import { StyledBR } from '../AboutModal/AboutModal.styles';
import { isShowPerspectiveModalAtom } from '../../utils/atoms';

import steamIcon from '../../assets/images/steam.png';

const Text = styled.p`
  font-size: 1rem;
  font-weight: 350;
  color: black;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 80%;
  padding: 20px;
  top: 15%;
`;

const HighlightText = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: #000;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SteamIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default function PerspectiveModal() {
  const [, setIsShowPerspectiveModal] = useAtom(isShowPerspectiveModalAtom);
  const modalRef = useRef(null);
  const youtubeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const modalElement = modalRef.current;
    const youtubeElement = youtubeRef.current;

    gsap.set([modalElement, youtubeElement], {
      opacity: 0,
      scale: 0.8,
      y: 20,
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(modalElement, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
    }).to(
      youtubeElement,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
      },
      '-=0.3',
    );
  }, []);

  useEffect(() => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        rotateY: isHovered ? '18deg' : '30deg',
        rotateX: isHovered ? '2deg' : '4deg',
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);

  function handleCloseModal(event) {
    event.stopPropagation();

    const modalElement = modalRef.current;
    const youtubeElement = youtubeRef.current;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.in' },
      onComplete: () => setIsShowPerspectiveModal(false),
    });

    tl.to(youtubeElement, {
      opacity: 0,
      scale: 0.8,
      y: 20,
      duration: 0.5,
    }).to(
      modalElement,
      {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.5,
      },
      '-=0.15',
    );
  }

  function handleModalClick(event) {
    event.stopPropagation();
  }

  return (
    <ModalBackdrop onClick={handleCloseModal}>
      <StyledPerspectiveDModal
        ref={modalRef}
        onClick={handleModalClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <TitleContainer>
          <h2 style={{ color: '#569dff' }}>여명</h2>
          <a
            href="https://store.steampowered.com/app/1475380/_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SteamIcon src={steamIcon} alt="Steam" />
          </a>
        </TitleContainer>
        <ContentContainer>
          <Text>
            <HighlightText>제작 : </HighlightText>Team Limited
          </Text>
          <Text>
            <HighlightText>개발 기간 : </HighlightText>2020년 03월 ~ 11월 약 8개월 소요, 2020년 12월
            스팀 출시
          </Text>
          <Text>
            <HighlightText>하드 웨어 / 엔진 : </HighlightText>PC / Unity
          </Text>
          <Text>
            <HighlightText>수상 이력</HighlightText> <StyledBR />- 인디크래프트 국내 부문 TOP 40
            선정
            <StyledBR />- BIC 루키 부문 선정 및 전시, 라이징 스타 및 오디오 부문 파이널 리스트
            <StyledBR />- 상하이 WePlay 2020 전시
            <StyledBR />- Unite Seoul 2020 Education Day 1위 수상
          </Text>
          <StyledBR />
          <StyledBR />
          <Text>
            <HighlightText>프로젝트 설명</HighlightText> <StyledBR />
            머나먼 미래, 인간은 AI의 통제 아래 자유를 잃고 하루하루 공포 속에 살아가게 됩니다.
            <StyledBR />
            시간을 다루는 초능력자 {`'마야'`}가 조력자 {`'맥스'`}와 함께 AI의 수장 {`'블렌더'`}에
            맞서 인류를 해방하는 이야기를 그리고 있습니다.
          </Text>
        </ContentContainer>
        <CloseButton onClick={handleCloseModal} />
      </StyledPerspectiveDModal>
      <YoutubeFrame ref={youtubeRef} videoId="79S_a3bNWxA?si=ACNoC4og4CG3e9fq" />
    </ModalBackdrop>
  );
}
