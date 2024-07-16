import { StyledButton } from './BaseButton.styles';

export default function BaseButton({ children, top, left, bottom, right, onClick }) {
  return (
    <StyledButton $top={top} $left={left} $bottom={bottom} $right={right} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
