import { FC } from 'react';

const Decentralized: FC = () => {
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
        <path d='M12 2v4'></path>
        <path d='m16 6 3-3'></path>
        <path d='M18 9h4'></path>
        <path d='m16 18 3 3'></path>
        <path d='M12 22v-4'></path>
        <path d='m8 18-3 3'></path>
        <path d='M6 15H2'></path>
        <path d='m8 6-3-3'></path>
        <circle cx='12' cy='12' r='4'></circle>
      </svg>
    </div>
  );
};

export { Decentralized };
