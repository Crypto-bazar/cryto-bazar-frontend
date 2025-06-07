import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card';
import Image from 'next/image';
import { LandingBanner } from 'widgets/landing-banner/ui';
import { Decentralized } from 'shared/ui/decentralized';
import { Collection } from 'shared/ui/collection';
import { Safety } from 'shared/ui/safety';

const pageData = [
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
];

const Home: FC = () => {
  return (
    <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <section className='relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-50 to-white py-20 text-center shadow-xl'>
        <div className='absolute inset-0 opacity-20'>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:100px_100px] opacity-10"></div>
        </div>
        <LandingBanner />
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

      <section className='mb-16'>
        <h2 className='mb-12 text-center text-3xl font-bold'>Почему выбирают нас</h2>
        <div className='grid gap-8 md:grid-cols-3'>
          <Card className='transition-shadow hover:shadow-xl'>
            <CardHeader>
              <Decentralized />
              <CardTitle>Децентрализованная платформа</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Сообщество управляет развитием платформы через систему голосований. Ваши активы полностью под вашим
                контролем.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-xl'>
            <CardHeader>
              <Collection />
              <CardTitle>Эксклюзивные коллекции</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Доступ к редким NFT от талантливых художников. Каждая работа верифицирована и имеет цифровой сертификат
                подлинности.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className='transition-shadow hover:shadow-xl'>
            <CardHeader>
              <Safety />
              <CardTitle>Безопасность</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Ваши активы защищены смарт-контрактами и криптографическими технологиями. Полная прозрачность всех
                операций.
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
          {pageData.map((nft, index) => (
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

      <section className='rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 py-16 text-center'>
        <h2 className='mb-4 text-3xl font-bold text-white md:text-4xl'>Готовы начать?</h2>
        <p className='mx-auto mb-8 max-w-2xl text-xl text-indigo-100'>
          Присоединяйтесь к сообществу и станьте частью цифровой революции в искусстве.
        </p>
      </section>
    </main>
  );
};

export default Home;
