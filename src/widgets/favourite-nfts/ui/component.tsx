'use client';

import { getFavouriteNFTs } from 'entities/nft/api';
import { useAccount } from 'wagmi';
import { NFTs } from 'widgets/nfts/ui';

const FavouriteNFTs = () => {
  const { address } = useAccount();

  return <NFTs fetchData={() => getFavouriteNFTs(address)} state={(state) => state.favourites} />;
};

export { FavouriteNFTs };
