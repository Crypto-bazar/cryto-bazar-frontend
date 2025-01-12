import { FC } from 'react';
import { ProductWidget } from '@/widgets/productWidget/ui';

const Home: FC = () => {
  return (
    <main className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      <ProductWidget />
    </main>
  );
};

export default Home;
