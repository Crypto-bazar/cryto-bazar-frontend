import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import LogoSVG from './svg/shiba-inu-shib-logo.svg';
import Link from 'next/link';
import { Border } from 'shared/ui/border/ui';

const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className={'bg-primary-orange'}>
        <div className={'mx-auto flex h-[100px] max-w-7xl items-center justify-between'}>
          <Image width={60} height={60} src={LogoSVG} alt={'logo'} />
          <ul className={'flex'}>
            <li>
              <Link href='/' className='hover:bg-primary-peach mx-3 rounded-xl p-2 transition-all hover:shadow-lg'>
                Главная страница
              </Link>
            </li>
            <Border />
            <li>
              <Link className={'hover:bg-primary-peach mx-3 rounded-xl p-2 transition-all hover:shadow-lg'} href={'/'}>
                Авторизоваться
              </Link>
            </li>
            <Border />
            <li>
              <Link className={'hover:bg-primary-peach mx-3 rounded-xl p-2 transition-all hover:shadow-lg'} href={'/'}>
                Личный кабинт
              </Link>
            </li>
          </ul>
        </div>
      </header>
      {children}
    </>
  );
};

export { Header };
