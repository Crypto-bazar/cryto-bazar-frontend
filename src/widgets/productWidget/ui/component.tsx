import { userApi } from '@/entities/product/api';
import { FC } from 'react';

const ProductWidget: FC = async () => {
  const data = await userApi.getProducts();

  return (
    <div className=''>
      {data.map((value, index) => (
        <div key={index} className='max-w-[350px] rounded-[15px] bg-primary-orange'>
          <p>{value.name}</p>
          <p>{value.description}</p>
          <p>{value.ownerUsername}</p>
        </div>
      ))}
    </div>
  );
};

export { ProductWidget };
