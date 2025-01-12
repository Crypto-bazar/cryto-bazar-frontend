import { FC } from 'react';
import { ProductType } from 'entities/product/types';
import Image from 'next/image';

type Props = {
  value: ProductType;
};

const Product: FC<Props> = ({ value }) => {
  return (
    <div className='w-full rounded-[15px] border border-gray-200 bg-white p-6 shadow-lg transition-transform hover:scale-105 md:p-4'>
      <div className='space-y-4'>
        <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
          <Image
            src={`${process.env.NEXT_PUBLIC_API}/images/${value.photo}` || '/placeholder-image.jpg'}
            alt={value.name}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>

        <h3 className='text-xl font-semibold text-gray-800'>{value.name}</h3>
        <p className='line-clamp-3 text-gray-600'>{value.description}</p>
        <div className='flex items-center border-t border-gray-100 pt-2'>
          <svg className='mr-2 h-5 w-5 text-gray-500' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'></path>
          </svg>
          <span className='text-sm text-gray-500'>{value.owner}</span>
        </div>
      </div>
    </div>
  );
};

export { Product };
