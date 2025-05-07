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
    <>
      <h1>Ваши NFT</h1>
      <CreateNFT />
      <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        {userNFTs &&
          userNFTs.length !== 0 &&
          userNFTs.map((nft, index) => (
            <Link key={index} href={`/nft/${nft.id}`}>
              <NFTCard nft={nft} />
            </Link>
          ))}
      </div>
    </>
  );
};

export { UserNFTs };
