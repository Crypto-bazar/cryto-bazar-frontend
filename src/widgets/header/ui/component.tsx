'use client';
import { FC } from 'react';

import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from 'shared/ui/nav-menu';
import { ConnectWallet } from 'widgets/connect-wallet/ui';

const Header: FC = () => {
  return (
    <header className='w-full border-b border-[#c1c1c1] bg-[#000000] shadow-md'>
      <div className='container mx-auto flex items-center text-white justify-between px-6 py-4'>
        <Link href='/' className='text-xl font-bold'>
          Криптобазар
        </Link>
        <NavigationMenu>
          <NavigationMenuList className='hidden space-x-6 md:flex'>
            <NavigationMenuItem>
              <Link href='/nft' className='transition hover:text-[#3c7a89]'>
                NFT
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/services' className='transition hover:text-[#3c7a89]'>
                Услуги
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href='/profile' className='transition hover:text-[#3c7a89]'>
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
