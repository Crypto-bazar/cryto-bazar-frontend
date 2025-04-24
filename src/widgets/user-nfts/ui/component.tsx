'use client';

import { getUserNFTs } from 'entities/nft/api';
import { nftActions, nftStore, userNFTActions } from 'entities/nft/models';
import { NFTCard } from 'entities/nft/ui';
import { useStore } from '@tanstack/react-store';
import { FC, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useListenMinted } from 'features/mintd-nft/hooks';
import { useListenPropose } from 'features/propose-nft/hooks/useListenPropose';
import Link from 'next/link';
import { CreateNFT } from 'features/create-nft/ui';

const UserNFTs: FC = () => {
  const { address } = useAccount();
  const userNFTs = useStore(nftStore, (state) => state.userItems);
  const { data: eventData } = useListenMinted();
  const { data: proposeData } = useListenPropose();

  useEffect(() => {
    (async () => {
      const data = await getUserNFTs(address);
      userNFTActions.setNFTs(data);
      if (proposeData && proposeData.tokenUri) {
        nftActions.updateProposedNFT(proposeData?.tokenUri, true);
      }
    })();
  }, [address, eventData, proposeData]);

  return (
    <>
      <h1>Ваши NFT</h1>
      <CreateNFT />
      <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        {userNFTs &&
          userNFTs.length !== 0 &&
          userNFTs.map((nft, index) => (
            <Link key={index} href={`/nft/${nft.id}`}>
              <NFTCard nft={nft} />
            </Link>
          ))}
      </div>
    </>
  );
};

export { UserNFTs };
