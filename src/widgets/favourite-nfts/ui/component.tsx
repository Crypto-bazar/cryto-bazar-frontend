'use client';

import { getFavouriteNFTs } from 'entities/nft/api';
import { useAccount } from 'wagmi';
import { NFTs } from 'widgets/nfts/ui';
import { useStore } from '@tanstack/react-store';
import { nftStore } from 'entities/nft/models';

const FavouriteNFTs = () => {
  const { address } = useAccount();
  const favourites = useStore(nftStore, (state) => state.favourites);

  return (
    <div className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      {favourites && favourites.length !== 0 ? (
        <>
          <h1>Избранные NFT</h1>
          <NFTs fetchData={() => getFavouriteNFTs(address)} state={(state) => state.favourites} />
        </>
      ) : (
        <h1 className='animate-fade-in mt-12 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-12 text-center text-2xl font-semibold text-gray-600 shadow-md backdrop-blur-sm transition-opacity'>
          💔 У вас пока нет избранных NFT!
        </h1>
      )}
    </div>
  );
};

export { FavouriteNFTs };
