import styled from 'styled-components';

export const StyledButton = styled.button`
  position: absolute;
  font-size: 1.5rem;
  padding: 15px 40px;
  color: #fff;
  background: linear-gradient(
    to right,
    ${({ startColor, endColor }) =>
      `${startColor} 0%, ${endColor} 51%, ${startColor} 100%`}
  );
  border: none;
  border-radius: 10px;
  z-index: 2;
  cursor: pointer;
  transition: 0.5s ease;
  background-size: 200% auto;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 0 20px rgba(238, 238, 238, 0.5);
  font-family: 'Alegreya Sans', sans-serif;
  font-weight: 300;
  font-style: normal;

  &:hover {
    background-position: right center;
    box-shadow:
      0 8px 12px rgba(0, 0, 0, 0.15),
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 0 20px rgba(238, 238, 238, 0.7);
  }
`;
