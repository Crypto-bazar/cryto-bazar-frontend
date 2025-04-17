'use client';
import { FC, useEffect } from 'react';
import { NFTCard } from 'entities/nft/ui';
import { getNFTs } from 'entities/nft/api';
import { CreateNFT } from 'features/create-nft/ui';
import { nftActions, nftStore } from 'entities/nft/models';
import { useStore } from '@tanstack/react-store';
import { Vote } from 'features/vote-nft/ui';

const NFTs: FC = () => {
  const items = useStore(nftStore, (state) => state.items);

  useEffect(() => {
    (async () => {
      const data = await getNFTs();
      if (JSON.stringify(items) !== JSON.stringify(data)) {
        nftActions.setNFTs(data);
      }
    })();
  }, [items]);

  return (
    <div>
      <CreateNFT />
      <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        {items &&
          items.length !== 0 &&
          items.map((nft, index) => (
            <NFTCard key={index} nft={nft}>
              {nft.proposed && <Vote proposeId={nft.proposal_id} />}
            </NFTCard>
          ))}
      </div>
    </div>
  );
};

export { NFTs };
