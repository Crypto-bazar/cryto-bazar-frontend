'use client';

import { NFTs } from 'widgets/nfts/ui';
import { useStore } from '@tanstack/react-store';
import { nftStore } from 'entities/nft/models';
import { useGetFavouriteNFT } from 'entities/nft/hooks/hooks';

const Favourite = () => {
  const items = useStore(nftStore, (state) => state.favourites);
  useGetFavouriteNFT();

  return (
    <main className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      {items && items.length !== 0 ? (
        <>
          <h1>NFT в продаже</h1>
          <NFTs items={items} />
        </>
      ) : (
        <h1 className='animate-fade-in mt-12 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-12 text-center text-2xl font-semibold text-gray-600 shadow-md backdrop-blur-sm transition-opacity'>
          😢 В данный момент нет NFT в избранных!
        </h1>
      )}
    </main>
  );
};

export { Favourite };
