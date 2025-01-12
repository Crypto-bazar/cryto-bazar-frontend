'use client';
import { FC, PropsWithChildren, useState } from 'react';
import Image from 'next/image';
import LogoSVG from './svg/shiba-inu-shib-logo.svg';
import Link from 'next/link';

const Header: FC<PropsWithChildren> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className='bg-primary-orange shadow-md'>
        <div className='mx-auto flex h-auto max-w-7xl flex-col items-center justify-between gap-4 p-4 md:h-20 md:flex-row md:gap-0'>
          <div className='flex w-full items-center justify-between md:w-auto transition-all duration-300 ease-in-out'>
            <Link href='/' className='transition-transform hover:scale-105'>
              <Image width={50} height={50} src={LogoSVG} alt='logo' className='rounded-full' />
            </Link>

            <button className='flex flex-col gap-1.5 md:hidden' onClick={toggleMenu} aria-label='Toggle menu'>
              <span
                className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
              />
              <span className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span
                className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              />
            </button>
          </div>

          <nav
            className={`w-full transform overflow-hidden transition-all duration-300 ease-in-out md:w-auto md:transform-none md:overflow-visible ${
              isMenuOpen ? 'h-[144px] opacity-100' : 'h-0 opacity-0 md:h-auto md:opacity-100'
            } ${isMenuOpen ? 'block' : 'hidden md:block'}`}
          >
            <ul className='flex flex-col items-center gap-4 md:flex-row md:gap-2'>
              <li className='mt-1'>
                <Link
                  href='/'
                  className='rounded-lg px-4 py-2.5 font-medium text-gray-800 transition-all duration-200 hover:bg-primary-peach hover:shadow-lg'
                >
                  Главная страница
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='rounded-lg px-4 py-2.5 font-medium text-gray-800 transition-all duration-200 hover:bg-primary-peach hover:shadow-lg'
                >
                  Авторизоваться
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='rounded-lg px-4 py-2.5 font-medium text-gray-800 transition-all duration-200 hover:bg-primary-peach hover:shadow-lg'
                >
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {children}
    </>
  );
};

export { Header };
