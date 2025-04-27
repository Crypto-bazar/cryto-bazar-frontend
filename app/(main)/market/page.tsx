'use client';

import { NFTs } from 'widgets/nfts/ui';
import { FC } from 'react';
import { getSalesNFT } from 'entities/nft/api';

const NFTPSalesPage: FC = () => {
  return (
    <main className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      <h1>NFT в продаже</h1>
      <NFTs fetchData={getSalesNFT} state={(state) => state.salesItems} />
    </main>
  );
};

export default NFTPSalesPage;
