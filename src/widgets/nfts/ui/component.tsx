'use client';
import { FC, useEffect } from 'react';
import { NFTCard } from 'entities/nft/ui';
import { getNFTs } from 'entities/nft/api';
import { nftActions, nftStore } from 'entities/nft/models';
import { useStore } from '@tanstack/react-store';
import Link from 'next/link';

const NFTs: FC = () => {
  const items = useStore(nftStore, (state) => state.items);

  useEffect(() => {
    (async () => {
      const data = await getNFTs();
      nftActions.setNFTs(data);
    })();
  }, []);

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        {items &&
          items.length !== 0 &&
          items.map((nft, index) => (
            <Link key={index} href={`/nft/${nft.id}`}>
              <NFTCard nft={nft} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export { NFTs };
