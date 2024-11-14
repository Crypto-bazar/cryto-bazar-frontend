import { FC } from 'react';
import { ProductType } from 'entities/product/types';

type Props = {
  value: ProductType
}

const Product: FC<Props> = ({value}) => {
  return (
    <div className='max-w-[350px] rounded-[15px] bg-primary-orange'>
      <p>{value.name}</p>
      <p>{value.description}</p>
      <p>{value.ownerUsername}</p>
    </div>
  );
};

export { Product };
