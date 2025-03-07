import { FC } from 'react';
import { NFTCard } from '@/entities/nft/ui';
import { getNFTs } from '@/entities/nft/api';

const NFTs: FC = async () => {
  const nfts = await getNFTs();
  return (
    <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
      {nfts.map((nft, index) => (
        <NFTCard key={index} nft={nft} />
      ))}
    </div>
  );
};

export { NFTs };
