'use client';

import { useStore } from '@tanstack/react-store';
import { useGetAllNFTs } from 'entities/nft/hooks/hooks';
import { nftStore } from 'entities/nft/models';
import { FindBar } from 'features/find-bar/ui';
import { Sort } from 'features/sort';
import { FC } from 'react';
import { NFTs } from 'widgets/nfts/ui';

const Sales: FC = () => {
  useGetAllNFTs();
  const items = useStore(nftStore, (state) => state.items.filter((nft) => nft.forSale));

  return (
    <div className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      <FindBar />
      <Sort />
      {items && items.length !== 0 ? (
        <>
          <h1>NFT в продаже</h1>
          <NFTs items={items} />
        </>
      ) : (
        <h1 className='animate-fade-in mt-12 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-12 text-center text-2xl font-semibold text-gray-600 shadow-md backdrop-blur-sm transition-opacity'>
          😢 В данный момент нет NFT в продаже!
        </h1>
      )}
    </div>
  );
};

export { Sales };
