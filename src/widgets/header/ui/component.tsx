'use client';
import { FC } from 'react';

import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from 'shared/ui/nav-menu';
import { ConnectWallet } from 'widgets/connect-wallet/ui';

const Header: FC = () => {
  return (
    <header className='w-full border-b border-[#ffffff] bg-[#ffffff] shadow-md'>
      <div className='container mx-auto flex items-center justify-between px-6 py-4'>
        <Link href='/' className='text-xl font-bold text-[#000]'>
          Криптобазар
        </Link>
        <NavigationMenu>
          <NavigationMenuList className='hidden space-x-6 md:flex'>
            <NavigationMenuItem>
              <Link href='/nft' className='text-[#000] transition hover:text-[#3c7a89]'>
                NFT
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/services' className='text-[#000] transition hover:text-[#3c7a89]'>
                Услуги
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/profile' className='text-[#000] transition hover:text-[#3c7a89]'>
                Личный кабинет
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ConnectWallet />
      </div>
    </header>
  );
};

export { Header };
