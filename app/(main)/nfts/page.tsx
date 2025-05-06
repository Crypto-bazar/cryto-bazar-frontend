'use client';

import { NFTs } from 'widgets/nfts/ui';
import { FC } from 'react';
import { useGetAllNFTs } from 'entities/nft/hooks/hooks';
import { useStore } from '@tanstack/react-store';
import { nftStore } from 'entities/nft/models';

const NFTPage: FC = () => {
  useGetAllNFTs();
  const items = useStore(nftStore, (state) => state.items);

  return (
    <main className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      <h1>Коллекции NFT</h1>
      <NFTs items={items} />
    </main>
  );
};

export default NFTPage;
