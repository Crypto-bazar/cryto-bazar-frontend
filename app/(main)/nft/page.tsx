import { NFTs } from 'widgets/nfts/ui';
import { FC } from 'react';

const NFTPage: FC = () => {
  return (
    <main className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      <h1>Коллекции NFT</h1>
      <NFTs />
    </main>
  );
};

export default NFTPage;
