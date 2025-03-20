'use client';

import { getUserNFTs } from '@/entities/nft/api';
import { nftStore, userNFTActions } from '@/entities/nft/models';
import { NFTCard } from '@/entities/nft/ui';
import { useStore } from '@tanstack/react-store';
import { FC, useEffect } from 'react';
import { useAccount } from 'wagmi';

const UserNFTs: FC = () => {
  const { address } = useAccount();
  const userNFTs = useStore(nftStore, (state) => state.userItems);

  useEffect(() => {
    (async () => {
      const data = await getUserNFTs(address);
      userNFTActions.setNFTs(data);
      console.log(data);
    })();
  }, [address]);
  return (
    <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
      {userNFTs && userNFTs.length !== 0 && userNFTs.map((nft, index) => <NFTCard nft={nft} key={index} />)}
    </div>
  );
};

export { UserNFTs };
