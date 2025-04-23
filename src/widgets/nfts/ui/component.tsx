'use client';
import { FC, useEffect } from 'react';
import { NFTCard } from 'entities/nft/ui';
import { getNFTs } from 'entities/nft/api';
import { CreateNFT } from 'features/create-nft/ui';
import { nftActions, nftStore } from 'entities/nft/models';
import { useStore } from '@tanstack/react-store';
import { Vote } from 'features/vote-nft/ui';
import { connectWS } from 'shared/api/ws';
import Link from 'next/link';

const NFTs: FC = () => {
  const items = useStore(nftStore, (state) => state.items);
  const ws = connectWS();

  useEffect(() => {
    if (!ws) return;

    ws.onopen = () => console.log('Hello, websocket');
    ws.onmessage = (ev) => {
      console.log(ev);
    };

    (async () => {
      const data = await getNFTs();
      nftActions.setNFTs(data);
    })();
  }, []);

  return (
    <div>
      <CreateNFT />
      <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        {items &&
          items.length !== 0 &&
          items.map((nft, index) => (
            <Link key={index} href={`/nft/${nft.id}`}>
              <NFTCard nft={nft}>{nft.proposed && nft.token_id === 0 && <Vote proposeId={nft.proposal_id} />}</NFTCard>
            </Link>
          ))}
      </div>
    </div>
  );
};

export { NFTs };
