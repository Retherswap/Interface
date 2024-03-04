import { TokenModel } from 'models/TokenModel';
import React from 'react';
import { useDefaultTokens } from 'hooks/Tokens';
import { PairModel } from 'models/PairModel';
import DoubleCurrencyLogo from 'components/DoubleLogo';
import { TokenPairListGrid } from '../token-pair-list-grid';
import Row from 'components/Row';
import { HideSmall, Fonts } from 'theme';
import { formatNumber } from 'utils/formatNumber';
import { HideExtraSmall } from 'components/Hide/hide-extra-small';

export default function TokenPairRow({ index, token, pair }: { index: number; token: TokenModel; pair: PairModel }) {
  const defaultTokens = useDefaultTokens();
  const volume24h = Number(
    pair.idToken0 === token.id
      ? pair.volume
          .filter((pairVolume) => {
            return new Date(pairVolume.date).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000;
          })
          .reduce((acc, volume) => acc + Number(volume.token0UsdVolume), 0)
      : pair.volume
          .filter((pairVolume) => {
            return new Date(pairVolume.date).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000;
          })
          .slice(0, 24)
          .reduce((acc, volume) => acc + Number(volume.token1UsdVolume), 0)
  );
  const volume7d = Math.floor(
    Number(
      pair.idToken0 === token.id
        ? pair.volume.reduce((acc, volume) => acc + Number(volume.token0UsdVolume), 0)
        : pair.volume.reduce((acc, volume) => acc + Number(volume.token1UsdVolume), 0)
    )
  );
  return (
    <TokenPairListGrid>
      <HideExtraSmall>
        <Fonts.black fontWeight={500} fontSize={15}>
          {index}
        </Fonts.black>
      </HideExtraSmall>
      <Row style={{ gap: '10px' }}>
        <DoubleCurrencyLogo
          size={22}
          currency0={defaultTokens[pair.token0.address]}
          currency1={defaultTokens[pair.token1.address]}
        />
        <Fonts.black fontWeight={500} fontSize={14}>
          {pair.token0.symbol}/{pair.token1.symbol}
        </Fonts.black>
      </Row>
      <Fonts.black fontWeight={500} fontSize={14}>
        ${formatNumber(pair.lastTvl?.reserveUsd)}
      </Fonts.black>
      <HideSmall>
        <Fonts.black fontWeight={500} fontSize={14}>
          ${formatNumber(volume24h)}
        </Fonts.black>
      </HideSmall>
      <HideSmall>
        <Fonts.black fontWeight={500} fontSize={14}>
          ${formatNumber(volume7d)}
        </Fonts.black>
      </HideSmall>
    </TokenPairListGrid>
  );
}
