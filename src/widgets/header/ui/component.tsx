'use client';
import { FC, useState } from 'react';
import Link from 'next/link';
import { ConnectWallet } from 'features/connect-wallet/ui';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useUser, useWalletDisconnectHandler } from 'features/user/hooks';
import { userStore } from 'entities/user/models/store';
import { useStore } from '@tanstack/react-store';
import Image from 'next/image';
import { useNftWsUpdates } from 'features/nft/ws-updates';
import { MobileMenu } from 'widgets/mobile-menu/ui';
import { useNavItems } from 'features/header/hooks';
import { BurgerMenu } from './BurgerMenu';
import { DesktopMenu } from './DesktopMenu';

const Header: FC = () => {
  const { address } = useAccount();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const user = useStore(userStore, (state) => state.item);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = useNavItems();
  useNftWsUpdates();

  useUser(address);

  useWalletDisconnectHandler();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='w-full border-b border-[#c1c1c1] bg-[#000000] shadow-md'>
      <div className='container mx-auto flex items-center justify-between px-6 py-4 text-white'>
        <Link href='/' className='text-xl font-bold'>
          Криптобазар
        </Link>

        <DesktopMenu navItems={navItems} />

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

          <BurgerMenu isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
        </motion.div>

        <MobileMenu isOpen={isMobileMenuOpen} navItems={navItems} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </header>
  );
};

export { Header };
