import { FC } from 'react';
import { LandingWidget } from '@/widgets/landingWidget/ui';
import { ProductWidget } from '@/widgets/productWidget/ui';

const Home: FC = () => {
  return (
    <div>
      <LandingWidget />
      <ProductWidget />
    </div>
  );
};

export default Home;
