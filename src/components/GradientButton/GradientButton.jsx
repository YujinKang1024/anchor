import { StyledButton } from './GradientButton.styles';

export default function GradientButton({ children, startColor, endColor }) {
  return (
    <StyledButton startColor={startColor} endColor={endColor}>
      {children}
    </StyledButton>
  );
}
