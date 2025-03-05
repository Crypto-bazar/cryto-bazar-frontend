import { userApi } from '@/entities/product/api';
import { FC } from 'react';
import { Product } from 'entities/product/ui';
import { Button } from 'shared/ui/button/ui';

const ProductWidget: FC = async () => {
  const data = await userApi.getProducts();

  return (
    <div className='container mx-auto px-4 py-8'>
      <Button variant={'outline'}>Создать</Button>
      <h1 className='mb-6 text-2xl font-bold text-gray-800'>Доска объявлений</h1>
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
        {data.length > 0 ? (
          data.map((value, index) => <Product key={index} value={value} />)
        ) : (
          <p className='col-span-full text-center text-gray-500'>No products available</p>
        )}
      </div>
    </div>
  );
};

export { ProductWidget };
