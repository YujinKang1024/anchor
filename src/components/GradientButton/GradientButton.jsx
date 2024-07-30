import { StyledButton } from './GradientButton.styles';

export default function GradientButton({ children, startColor, endColor, onClick }) {
  return (
    <StyledButton startColor={startColor} endColor={endColor} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
