import { ScrollContainer, Scrollbar, Thumb } from './CustomScrollbar.styles';

export default function CustomScrollbar() {
  return (
    <ScrollContainer>
      <Scrollbar>
        <Thumb />
      </Scrollbar>
    </ScrollContainer>
  );
}
