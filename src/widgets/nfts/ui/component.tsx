'use client';
import { FC, useEffect } from 'react';
import { NFTCard } from 'entities/nft/ui';
import { NFT, NFTState, nftStore } from 'entities/nft/models';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useStore } from '@tanstack/react-store';
import { useAccount } from 'wagmi';

type Props = {
  fetchData: () => Promise<NFT[]>;
  state: (state: NFTState) => NFT[];
};

const NFTs: FC<Props> = ({ fetchData, state }) => {
  const items = useStore(nftStore, state);
  const { address } = useAccount();
  useEffect(() => {
    (async () => {
      fetchData().catch(() => notFound());
    })();
  }, [fetchData, address]);

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
