import { forwardRef } from 'react';
import { FrameContainer, StyledIframe } from './YouTubeFrame.styles';

const YoutubeFrame = forwardRef(({ videoId }, ref) => {
  return (
    <FrameContainer ref={ref}>
      <StyledIframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
        title="YouTube video player"
      />
    </FrameContainer>
  );
});

YoutubeFrame.displayName = 'YoutubeFrame';

export default YoutubeFrame;
