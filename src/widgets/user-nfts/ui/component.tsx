'use client';

import { getUserNFTs } from 'entities/nft/api';
import { nftActions, nftStore, userNFTActions } from 'entities/nft/models';
import { NFTCard } from 'entities/nft/ui';
import { useStore } from '@tanstack/react-store';
import { FC, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { StartVoting } from 'features/propose-nft/ui';
import { useListenMinted } from 'features/mintd-nft/hooks';
import { useListenPropose } from 'features/propose-nft/hooks/useListenPropose';

const UserNFTs: FC = () => {
  const { address } = useAccount();
  const userNFTs = useStore(nftStore, (state) => state.userItems);
  const { data: eventData } = useListenMinted();
  const { data: proposeData } = useListenPropose();

  useEffect(() => {
    (async () => {
      const data = await getUserNFTs(address);
      userNFTActions.setNFTs(data);
      console.log(proposeData);
      if (proposeData && proposeData.tokenUri) {
        nftActions.updateProposedNFT(proposeData?.tokenUri, true);
        // console.table(userNFTs);
      }
    })();
  }, [address, eventData, proposeData]);

  return (
    <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
      {userNFTs &&
        userNFTs.length !== 0 &&
        userNFTs.map((nft, index) => (
          <NFTCard nft={nft} key={index}>
            {!nft.proposed && <StartVoting tokenUri={nft.token_uri} />}
          </NFTCard>
        ))}
    </div>
  );
};

export { UserNFTs };
