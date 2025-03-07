import { FC } from 'react';
import { NFTs } from '@/widgets/nfts/ui';

const Home: FC = () => {
  return (
    <main className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      {/* <ProductWidget /> */}
      <NFTs />
    </main>
  );
};

export default Home;
