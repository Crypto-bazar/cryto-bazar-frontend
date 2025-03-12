'use client';
import { FC, useEffect, useState } from 'react';
import { NFTCard } from '@/entities/nft/ui';
import { getNFTs } from '@/entities/nft/api';
import { CreateNFT } from 'features/create-nft/ui';
import { useCreateToken } from '@/features/create-nft/api';
import { NFT } from '@/entities/nft/models';

const NFTs: FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const createNFT = useCreateToken();

  useEffect(() => {
    (async () => {
      const data = await getNFTs();
      setNfts(data);
    })();
  }, []);

  return (
    <div>
      <CreateNFT />
      <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {nfts && nfts.map((nft, index) => <NFTCard key={index} onCreate={createNFT} nft={nft} />)}
      </div>
    </div>
  );
};

export { NFTs };
