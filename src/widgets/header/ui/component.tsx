'use client';
import { FC } from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from 'shared/ui/nav-menu';
import { ConnectWallet } from 'widgets/connect-wallet/ui';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useUser } from '../../../features/user/hooks';
import { userStore } from 'entities/user/models/store';
import { useStore } from '@tanstack/react-store';
import Image from 'next/image';

const Header: FC = () => {
  const { address } = useAccount();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const user = useStore(userStore, (state) => state.item);
  useUser(address as string);

  return (
    <header className='w-full border-b border-[#c1c1c1] bg-[#000000] shadow-md'>
      <div className='container mx-auto flex items-center justify-between px-6 py-4 text-white'>
        <Link href='/' className='text-xl font-bold'>
          Криптобазар
        </Link>

        <NavigationMenu>
          <NavigationMenuList className='hidden space-x-6 md:flex'>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <NavigationMenuItem>
                <Link href='/nft' className='transition-all hover:text-[#3c7a89]'>
                  NFT
                </Link>
              </NavigationMenuItem>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            >
              <NavigationMenuItem>
                <Link href='/profile' className='transition-all hover:text-[#3c7a89]'>
                  Личный кабинет
                </Link>
              </NavigationMenuItem>
            </motion.div>
          </NavigationMenuList>
        </NavigationMenu>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
          className='flex items-center gap-4'
        >
          <ConnectWallet />
          {user?.avatar_url && (
            <Link href='/profile'>
              <div className='h-10 w-10 overflow-hidden rounded-full border border-white transition-all duration-200 hover:ring-2 hover:ring-[#3c7a89]'>
                <Image
                  src={`${apiUrl}${user.avatar_url}`}
                  alt='Аватар'
                  width={40}
                  height={40}
                  className='h-full w-full object-cover'
                />
              </div>
            </Link>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export { Header };
