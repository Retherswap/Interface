import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TokenListRow from './token-list-row';
import { TokenModel } from 'models/TokenModel';
import { TokenListGrid } from './token-list-grid';
import { Fonts } from 'theme';
import Column from 'components/Column';
import Paginator from 'components/Paginator/Paginator';
import { HideMedium } from 'components/Hide/hide-medium';
import { HideSmall } from 'components/Hide/hide-small';
import { HideExtraSmall } from 'components/Hide/hide-extra-small';
import { apiUrl } from 'configs/server';

export const Wrapper = styled.div`
  display: grid;
  row-gap: 1em;
  position: relative;
  padding: 1.5rem;
  width: 100%;
  max-width: 1200px;
  border-radius: 2rem;
  box-shadow: 0 0 10px skyblue; /* Use skyblue color for the glow */
  background: ${({ theme }) => theme.bg1};
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.bg3};
`;

export const RowDivider = styled(Divider)`
  height: 1px;
`;

export default function TokenList() {
  const elementsPerPage = 10;
  const [tokens, setTokens] = useState<TokenModel[]>([]);
  const fetchInfo = () => {
    return fetch(`${apiUrl}/tokens`)
      .then((res) => res.json())
      .then((d) => setTokens(d))
      .catch((e) => {
        console.error(e);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const [page, setPage] = useState(1);
  return (
    <div style={{ padding: '1em' }}>
      <Wrapper id="token-list-page">
        <TokenListGrid>
          <HideExtraSmall>
            <Fonts.blue fontWeight={600}>#</Fonts.blue>
          </HideExtraSmall>
          <Fonts.blue fontWeight={600}>Token</Fonts.blue>
          <Fonts.blue fontWeight={600}>Price</Fonts.blue>
          <HideMedium>
            <Fonts.blue fontWeight={600}>Price change</Fonts.blue>
          </HideMedium>
          <HideMedium>
            <Fonts.blue fontWeight={600}>Volume 24H</Fonts.blue>
          </HideMedium>
          <HideSmall>
            <Fonts.blue fontWeight={600}>TVL</Fonts.blue>
          </HideSmall>
        </TokenListGrid>
        <Divider />
        {tokens &&
          tokens.slice((page - 1) * elementsPerPage, page * elementsPerPage).map((token, index) => (
            <Column key={`token-row-${token.id}`} style={{ gap: '1em' }}>
              <TokenListRow index={index + 1} token={token} /> <RowDivider />
            </Column>
          ))}
        <Paginator
          page={page}
          elementsPerPage={elementsPerPage}
          count={tokens.length}
          onPageChange={(page) => {
            setPage(page);
          }}
        ></Paginator>
      </Wrapper>
    </div>
  );
}
