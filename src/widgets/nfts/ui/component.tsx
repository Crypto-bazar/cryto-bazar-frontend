'use client';
import { FC, useEffect, } from 'react';
import { NFTCard } from '@/entities/nft/ui';
import { getNFTs } from '@/entities/nft/api';
import { CreateNFT } from 'features/create-nft/ui';
import { useCreateToken, useEventListener } from '@/features/create-nft/hooks';
import { nftActions, nftStore } from '@/entities/nft/models';
import { useStore } from '@tanstack/react-store';

const NFTs: FC = () => {
  const { createToken } = useCreateToken();
  const items = useStore(nftStore, (state) => state.items);

  const handleCreateToken = async (tokenUri: string) => {
    await createToken(tokenUri);
  };

  const { data } = useEventListener()

  useEffect(() => {
    if (data) {
      if (!data.tokenURI) {
        return;
      }
      nftActions.changeTokenId(data.tokenURI, Number(data.tokenId))
    }
  }, [data])


  useEffect(() => {
    (async () => {
      const data = await getNFTs();
      if (JSON.stringify(items) !== JSON.stringify(data)) {
        nftActions.setNFTs(data)
      }
    })()
  }, [items]);

  return (
    <div>
      <CreateNFT />
      <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        {items.map((nft, index) => (
          <NFTCard key={index} onCreate={handleCreateToken} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export { NFTs };
