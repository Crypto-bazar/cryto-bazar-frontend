import { userApi } from '@/entities/product/api';
import { FC } from 'react';
import { Product } from 'entities/product/ui';

const ProductWidget: FC = async () => {
  const data = await userApi.getProducts();

  return (
    <div className=''>
      {data.map((value, index) => (
       <Product key={index} value={value}/>
      ))}
    </div>
  );
};

export { ProductWidget };
