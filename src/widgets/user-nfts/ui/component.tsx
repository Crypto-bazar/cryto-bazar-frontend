'use client';

import { nftStore } from 'entities/nft/models';
import { NFTCard } from 'entities/nft/ui';
import { useStore } from '@tanstack/react-store';
import { FC } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { CreateNFT } from 'features/create-nft/ui';
import { useGetAllNFTs } from 'entities/nft/hooks/hooks';

const UserNFTs: FC = () => {
  const { address } = useAccount();
  useGetAllNFTs();
  const userNFTs = useStore(nftStore, (state) => state.items.filter((value) => value.owner === address));

  return (
    <div>
      <h1>Ваши NFT</h1>
      <CreateNFT />
      {
        userNFTs && userNFTs.length !== 0 ? (
          <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
            {userNFTs.map((nft) => (
              <Link key={nft.id} href={`/nft/${nft.id}`}>
                <NFTCard nft={nft} />
              </Link>
            ))}
          </div>
        ) : (
          <h1 className='animate-fade-in mt-12 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-12 text-center text-2xl font-semibold text-gray-600 shadow-md backdrop-blur-sm transition-opacity'>
            😢 В данный момент у вас нет NFT!
          </h1>
        )
      }
    </div>
  );

}
export { UserNFTs }
