import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shared/ui/card';
import Image from 'next/image';
import { LandingBanner } from 'widgets/landing-banner/ui';
import { Decentralized } from 'shared/ui/decentralized';
import { Collection } from 'shared/ui/collection';
import { Safety } from 'shared/ui/safety';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

const statsData = [
  { value: '10K+', label: 'Уникальных NFT' },
  { value: '5K+', label: 'Коллекционеров' },
  { value: '2K+', label: 'Создателей' },
  { value: '1M+', label: 'Транзакций' },
];

const featureData = [
  {
    title: 'Децентрализованная платформа',
    description:
      'Сообщество управляет развитием платформы через систему голосований. Ваши активы полностью под вашим контролем.',
    icon: <Decentralized />,
  },
  {
    title: 'Эксклюзивные коллекции',
    description:
      'Доступ к редким NFT от талантливых художников. Каждая работа верифицирована и имеет цифровой сертификат подлинности.',
    icon: <Collection />,
  },
  {
    title: 'Безопасность',
    description:
      'Ваши активы защищены смарт-контрактами и криптографическими технологиями. Полная прозрачность всех операций.',
    icon: <Safety />,
  },
];

const Home: FC = () => {
  return (
    <main className='mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8'>
      <section className='relative mb-14 overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-b from-indigo-100/80 via-white to-slate-50 px-6 py-14 shadow-[0_40px_120px_-80px_rgba(37,99,235,0.9)] sm:px-10'>
        <div className='pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl'></div>
        <div className='pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-200/35 blur-3xl'></div>
        <div className='absolute inset-0 opacity-25'>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:100px_100px] opacity-10"></div>
        </div>
        <LandingBanner />
      </section>

      <section className='mb-16 grid grid-cols-2 gap-4 md:grid-cols-4'>
        {statsData.map((item) => (
          <Card key={item.label} className='border-slate-200/80 bg-white/90 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md'>
            <CardContent className='p-6'>
              <p className='text-3xl font-extrabold tracking-tight text-slate-900'>{item.value}</p>
              <p className='mt-1 text-sm text-slate-500'>{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className='mb-16'>
        <h2 className='mb-2 text-center text-3xl font-bold tracking-tight text-slate-900'>Почему выбирают нас</h2>
        <p className='mx-auto mb-10 max-w-2xl text-center text-slate-600'>
          Продуктовый фокус на прозрачности сделок, удобстве торговли и высоком качестве коллекций.
        </p>

        <div className='grid gap-8 md:grid-cols-3'>
          {featureData.map((feature) => (
            <Card
              key={feature.title}
              className='group border-slate-200/80 bg-white/90 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl'
            >
              <CardHeader>
                {feature.icon}
                <CardTitle className='text-slate-900'>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='leading-relaxed'>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='mb-16'>
        <div className='mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight text-slate-900'>Популярные NFT</h2>
            <p className='mt-1 text-slate-600'>Подборка коллекций, которые чаще всего смотрят пользователи.</p>
          </div>
          <Button variant='outline' className='w-fit border-slate-200 bg-white' asChild>
            <Link href='/nfts'>
              Смотреть все <ArrowRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {pageData.map((nft) => (
            <Card
              key={nft.image}
              className='group overflow-hidden border-slate-200/80 bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'
            >
              <div className='aspect-square overflow-hidden bg-slate-100'>
                <Image
                  width={500}
                  height={500}
                  src={`/uploads/${nft.image}`}
                  alt={nft.name}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <CardHeader>
                <CardTitle className='text-slate-900'>{nft.name}</CardTitle>
                <CardDescription>Автор: {nft.creator}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-end'>
                  <Button variant='outline' size='sm' className='border-slate-200 bg-white' asChild>
                    <Link href='/nfts'>
                      Подробнее <ArrowRight className='h-4 w-4' />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className='relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-16 text-center shadow-xl'>
        <div className='pointer-events-none absolute inset-0 opacity-20'>
          <div className='absolute -left-24 top-0 h-64 w-64 rounded-full bg-white blur-3xl'></div>
          <div className='absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-white blur-3xl'></div>
        </div>
        <h2 className='mb-4 text-3xl font-bold text-white md:text-4xl'>Готовы начать?</h2>
        <p className='mx-auto mb-8 max-w-2xl text-lg text-indigo-100 md:text-xl'>
          Присоединяйтесь к сообществу и станьте частью цифровой революции в искусстве.
        </p>
        <div className='flex flex-col justify-center gap-3 sm:flex-row'>
          <Button variant='secondary' className='h-11 rounded-full px-7 text-sm font-semibold' asChild>
            <Link href='/nfts'>Выбрать NFT</Link>
          </Button>
          <Button
            variant='outline'
            className='h-11 rounded-full border-white/40 bg-transparent px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white'
            asChild
          >
            <Link href='/profile/nfts'>Выставить своё NFT</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
