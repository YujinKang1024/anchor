import styled from 'styled-components';

export const TextContainer = styled.div`
  padding: 4% 6%;
`;

export const Text = styled.p`
  font-size: 1.6rem;
  font-weight: ${({ fontWeight = 400 }) => `${fontWeight}`};
  margin-top: ${({ marginTop }) => `${marginTop}`};
  color: ${({ color }) => `${color}`};
`;

export const HighlightText = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ color }) => `${color}`};
`;
