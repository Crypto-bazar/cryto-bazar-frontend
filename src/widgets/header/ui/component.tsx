'use client';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { ConnectWallet } from 'features/connect-wallet/ui';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useUser, useWalletDisconnectHandler } from 'features/user/hooks';
import { userStore } from 'entities/user/models/store';
import { useStore } from '@tanstack/react-store';
import { useNftWsUpdates } from 'features/nft/ws-updates';
import { MobileMenu } from 'widgets/mobile-menu/ui';
import { useNavItems } from 'features/header/hooks';
import { usePathname } from 'next/navigation';
import { BurgerMenu } from './BurgerMenu';
import { DesktopMenu } from './DesktopMenu';
import { Avatar } from 'shared/ui/avatar';

const Header: FC = () => {
  const { address } = useAccount();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useStore(userStore, (state) => state.item);
  const navItems = useNavItems();
  useNftWsUpdates();

  useUser(address);

  useWalletDisconnectHandler();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-black/85 text-white backdrop-blur-md'>
      <div className='mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8'>
        <Link href='/' className='group inline-flex shrink-0 items-center gap-3'>
          <span className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs font-black tracking-[0.12em] transition-colors group-hover:bg-white/20'>
            CB
          </span>
          <span className='hidden text-lg font-semibold tracking-tight sm:inline'>Криптобазар</span>
        </Link>

        <DesktopMenu navItems={navItems} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
          className='ml-auto flex items-center gap-2 sm:gap-3'
        >
          <ConnectWallet />
          <Avatar address={address} height={10} width={10} user={user} />
          <BurgerMenu isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
        </motion.div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} navItems={navItems} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export { Header };
