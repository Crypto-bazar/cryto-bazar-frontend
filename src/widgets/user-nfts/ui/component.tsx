'use client';

import { getUserNFTs } from 'entities/nft/api';
import { nftStore, userNFTActions } from 'entities/nft/models';
import { NFTCard } from 'entities/nft/ui';
import { useStore } from '@tanstack/react-store';
import { FC, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { StartVoting } from 'features/propose-nft/ui';
import { useListenPropose } from 'features/propose-nft/hooks';

const UserNFTs: FC = () => {
  const { address } = useAccount();
  const userNFTs = useStore(nftStore, (state) => state.userItems);
  const { data: eventData } = useListenPropose();

  useEffect(() => {
    (async () => {
      const data = await getUserNFTs(address);
      userNFTActions.setNFTs(data);
      console.log(eventData);
    })();
  }, [address, eventData]);
  return (
    <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
      {userNFTs &&
        userNFTs.length !== 0 &&
        userNFTs.map((nft, index) => (
          <NFTCard nft={nft} key={index}>
            <StartVoting tokenUri={nft.token_uri} />
          </NFTCard>
        ))}
    </div>
  );
};

export { UserNFTs };
