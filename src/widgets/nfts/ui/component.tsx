import { FC } from 'react';
import { NFTCard } from '@/entities/nft/ui';
import { getNFTs } from '@/entities/nft/api';
import { CreateNFT } from 'features/create-nft/ui';

const NFTs: FC = async () => {
  const nfts = await getNFTs();
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
