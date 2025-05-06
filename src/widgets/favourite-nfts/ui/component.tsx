'use client';

import { getFavouriteNFTs } from 'entities/nft/api';
import { useAccount } from 'wagmi';
import { NFTs } from 'widgets/nfts/ui';
import { useStore } from '@tanstack/react-store';
import { nftStore } from 'entities/nft/models';

const FavouriteNFTs = () => {
  const { address } = useAccount();
  const items = useStore(nftStore, (state) => state.favourites);
  getFavouriteNFTs(address);

  return <NFTs items={items} />;
};

export { FavouriteNFTs };
