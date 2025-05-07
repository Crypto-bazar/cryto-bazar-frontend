'use client';

import { NFTs } from 'widgets/nfts/ui';
import { useStore } from '@tanstack/react-store';
import { nftStore } from 'entities/nft/models';
import { useGetFavouriteNFT } from 'entities/nft/hooks/hooks';

const FavouriteNFTs = () => {
  const items = useStore(nftStore, (state) => state.favourites);
  useGetFavouriteNFT();

  return <NFTs items={items} />;
};

export { FavouriteNFTs };
