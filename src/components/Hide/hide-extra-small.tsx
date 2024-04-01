import styled from 'styled-components';

export const HideExtraSmall = styled.div`
  display: unset;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`;
