'use client';
import { FC, useState } from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from 'shared/ui/nav-menu';
import { ConnectWallet } from 'widgets/connect-wallet/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useUser } from 'features/user/hooks';
import { userStore } from 'entities/user/models/store';
import { useStore } from '@tanstack/react-store';
import Image from 'next/image';

const Header: FC = () => {
  const { address } = useAccount();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const user = useStore(userStore, (state) => state.item);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useUser(address as string);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/nfts', label: 'NFT коллекции' },
    { href: '/market', label: 'Торговая площадка' },
    ...(address ? [{ href: '/profile', label: 'Личный кабинет' }] : []),
  ];

  return (
    <header className='w-full border-b border-[#c1c1c1] bg-[#000000] shadow-md'>
      <div className='container mx-auto flex items-center justify-between px-6 py-4 text-white'>
        <Link href='/' className='text-xl font-bold'>
          Криптобазар
        </Link>

        {/* Desktop */}
        <NavigationMenu className='hidden md:block'>
          <NavigationMenuList className='space-x-6'>
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
              >
                <NavigationMenuItem>
                  <Link href={item.href} className='transition-all hover:text-[#3c7a89]'>
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              </motion.div>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
          className='flex items-center gap-4'
        >
          <ConnectWallet />
          {user?.avatar_url && address && (
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

          {/* Burger */}
          <button
            className='ml-4 flex flex-col items-center justify-center md:hidden'
            onClick={toggleMobileMenu}
            aria-label='Меню'
          >
            <span
              className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'
              }`}
            ></span>
            <span
              className={`my-0.5 block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 rounded-sm bg-white transition-all duration-300 ease-out ${
                isMobileMenuOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
              }`}
            ></span>
          </button>
        </motion.div>

        {/* Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className='absolute left-0 top-[70px] z-50 w-full overflow-hidden bg-[#000000] shadow-lg md:hidden'
            >
              <div className='container mx-auto px-6 py-4'>
                <ul className='flex flex-col space-y-4'>
                  {navItems.map((item) => (
                    <motion.li
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className='block py-2 text-lg transition-all hover:text-[#3c7a89]'
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export { Header };
