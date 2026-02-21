import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { Badge } from 'shared/ui/badge';
import Link from 'next/link';

const LandingBanner: FC = () => {
  return (
    <div className='relative z-10 text-left md:text-center'>
      <Badge
        variant='secondary'
        className='mb-5 rounded-full border border-indigo-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700'
      >
        Новое поколение NFT-платформ
      </Badge>
      <h1 className='mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl'>
        <span className='bg-gradient-to-r from-indigo-700 via-sky-600 to-cyan-600 bg-clip-text text-transparent'>
          Криптобазар
        </span>{' '}
        для цифрового искусства
      </h1>
      <p className='mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl'>
        Децентрализованная платформа для цифрового искусства. Покупайте, продавайте и создавайте уникальные NFT вместе с
        сообществом.
      </p>
      <div className='flex flex-col justify-start gap-3 sm:flex-row sm:justify-center'>
        <Button size='lg' className='h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-indigo-200/70' asChild>
          <Link href='/nfts'>Исследовать коллекции</Link>
        </Button>
        <Button
          size='lg'
          variant='outline'
          className='h-12 rounded-full border-indigo-200 bg-white/80 px-8 text-base font-semibold hover:bg-white'
          asChild
        >
          <Link href='/profile/nfts'>Создать NFT</Link>
        </Button>
      </div>
    </div>
  );
};

export { LandingBanner };
