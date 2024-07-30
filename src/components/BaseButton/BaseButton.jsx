import { forwardRef } from 'react';
import { StyledButton } from './BaseButton.styles';

const BaseButton = forwardRef(({ children, top, left, bottom, right, onClick }, ref) => {
  return (
    <StyledButton
      ref={ref}
      $top={top}
      $left={left}
      $bottom={bottom}
      $right={right}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
});

export default BaseButton;

BaseButton.displayName = 'BaseButton';
