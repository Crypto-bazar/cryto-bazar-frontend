'use client';

import { getFavourineNFTs } from 'entities/nft/api';
import { useAccount } from 'wagmi';
import { NFTs } from 'widgets/nfts/ui';

const FavoruiteNFTs = () => {
  const { address } = useAccount();

  return <NFTs fetchData={() => getFavourineNFTs(address)} state={(state) => state.favourites} />;
};

export { FavoruiteNFTs };
