import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { Badge } from 'shared/ui/badge';
import Link from 'next/link';

const LandingBanner: FC = () => {
  return (
    <div className='relative z-10'>
      <Badge variant='secondary' className='mb-4 text-sm font-semibold'>
        Новое поколение NFT
      </Badge>
      <h1 className='mb-6 text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl'>
        <span className='bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent'>NFT</span>{' '}
        Marketplace
      </h1>
      <p className='mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600'>
        Децентрализованная платформа для цифрового искусства. Покупайте, продавайте и создавайте уникальные NFT вместе с
        сообществом.
      </p>
      <div className='flex flex-col justify-center gap-4 sm:flex-row'>
        <Button size='lg' className='px-8 py-6 text-base font-bold' asChild>
          <a href='/nfts'>Исследовать коллекции</a>
        </Button>
        <Button size='lg' variant='outline' className='px-8 py-6 text-base font-bold' asChild>
          <Link href='/profile/nfts'>Создать NFT</Link>
        </Button>
      </div>
    </div>
  );
};

export { LandingBanner };
