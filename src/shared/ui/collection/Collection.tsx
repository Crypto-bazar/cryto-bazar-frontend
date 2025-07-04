import { FC } from 'react';

const Collection: FC = () => {
  return (
    <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'></path>
        <circle cx='12' cy='12' r='3'></circle>
      </svg>
    </div>
  );
};

export { Collection };
