import { FC } from 'react';
import { Badge } from 'shared/ui/badge';
import { Button } from 'shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const Home: FC = () => {
  return (
    <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <section className='relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-b from-black to-gray-900 py-20 text-center shadow-2xl'>
        <div className='absolute inset-0 opacity-20'>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:100px_100px]"></div>
        </div>
        <div className='relative z-10'>
          <Badge variant='secondary' className='mb-4 text-sm font-semibold'>
            Новое поколение NFT
          </Badge>
          <h1 className='mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl'>
            <span className='bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>CryptoBazar</span>{' '}
            Marketplace
          </h1>
          <p className='mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-300'>
            Откройте для себя эксклюзивные цифровые активы. Покупайте, продавайте и создавайте уникальные NFT на нашей
            платформе с передовой технологией Web3.
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
      </section>

      <section className='mb-16 grid grid-cols-2 gap-4 md:grid-cols-4'>
        <Card className='text-center'>
          <CardContent className='p-6'>
            <p className='text-3xl font-bold'>10K+</p>
            <p className='text-gray-500'>Уникальных NFT</p>
          </CardContent>
        </Card>
        <Card className='text-center'>
          <CardContent className='p-6'>
            <p className='text-3xl font-bold'>5K+</p>
            <p className='text-gray-500'>Коллекционеров</p>
          </CardContent>
        </Card>
        <Card className='text-center'>
          <CardContent className='p-6'>
            <p className='text-3xl font-bold'>2K+</p>
            <p className='text-gray-500'>Создателей</p>
          </CardContent>
        </Card>
        <Card className='text-center'>
          <CardContent className='p-6'>
            <p className='text-3xl font-bold'>1M+</p>
            <p className='text-gray-500'>Транзакций</p>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className='mb-16'>
        <h2 className='mb-12 text-center text-3xl font-bold'>Почему выбирают CryptoBazar</h2>
        <div className='grid gap-8 md:grid-cols-3'>
          <Card className='transition-shadow hover:shadow-xl'>
            <CardHeader>
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
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
              <CardTitle>Децентрализованная платформа</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Полный контроль над своими активами благодаря технологии блокчейн. Никаких посредников — только прямые
                P2P-транзакции.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-xl'>
            <CardHeader>
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'></path>
                  <circle cx='12' cy='12' r='3'></circle>
                </svg>
              </div>
              <CardTitle>Эксклюзивные коллекции</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Доступ к редким NFT от ведущих художников и брендов. Каждый токен верифицирован и имеет цифровой
                сертификат подлинности.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-xl'>
            <CardHeader>
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect width='18' height='11' x='3' y='11' rx='2' ry='2'></rect>
                  <path d='M7 11V7a5 5 0 0 1 10 0v4'></path>
                </svg>
              </div>
              <CardTitle>Безопасность</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Передовые методы шифрования и смарт-контракты обеспечивают безопасность ваших активов и данных.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='mb-16'>
        <div className='mb-8 flex items-center justify-between'>
          <h2 className='text-3xl font-bold'>Популярные NFT</h2>
          <Button variant='outline' asChild>
            <a href='/nfts'>Смотреть все</a>
          </Button>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {[
            {
              name: 'Северное сияние',
              creator: 'Артём Финский',
              image: '65591643-f7bf-49a7-97fb-a290b1e50431-wp4442817-finland-4k-wallpapers.jpg',
            },
            {
              name: 'Зимний лес',
              creator: 'Наталья Снежная',
              image: 'wp4442754-finland-4k-wallpapers.jpg',
            },
            {
              name: 'Замёрзшее озеро',
              creator: 'Максим Ледяной',
              image: '67e629e5-342a-42a2-a891-08f5a5b71ea7-wp4442766-finland-4k-wallpapers.jpg',
            },
          ].map((nft, index) => (
            <Card key={index} className='group overflow-hidden'>
              <div className='aspect-square overflow-hidden'>
                <Image
                  width={500}
                  height={500}
                  src={`/uploads/${nft.image}`}
                  alt={nft.name}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <CardHeader>
                <CardTitle>{nft.name}</CardTitle>
                <CardDescription>Автор: {nft.creator}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between'>
                  <Button variant='outline' size='sm'>
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='rounded-3xl bg-gradient-to-r from-black to-gray-900 py-16 text-center'>
        <h2 className='mb-4 text-3xl font-bold text-white md:text-4xl'>Готовы начать?</h2>
        <p className='mx-auto mb-8 max-w-2xl text-xl text-gray-300'>
          Присоединяйтесь к сообществу CryptoBazar сегодня и откройте мир цифровых коллекций.
        </p>
        {/*<Button size='lg' className='px-8 py-6 text-base font-bold' asChild>*/}
        {/*  <a href='/signup'>Создать аккаунт</a>*/}
        {/*</Button>*/}
      </section>
    </main>
  );
};

export default Home;
