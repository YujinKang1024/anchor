import { FrameContainer, StyledIframe } from './YouTubeFrame.styles';

export default function YoutubeFrame({ videoId }) {
  return (
    <FrameContainer>
      <StyledIframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
        title="YouTube video player"
      />
    </FrameContainer>
  );
}
