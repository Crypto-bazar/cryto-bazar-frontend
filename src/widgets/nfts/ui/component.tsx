'use client';
import { FC } from 'react';
import { NFTCard } from 'entities/nft/ui';
import { NFT } from 'entities/nft/models';
import Link from 'next/link';

type Props = {
  items: NFT[];
};

const NFTs: FC<Props> = ({ items }) => {
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
