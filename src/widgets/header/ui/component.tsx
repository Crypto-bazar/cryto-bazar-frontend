'use client';
import { FC, useState } from 'react';
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
import { BurgerMenu } from './BurgerMenu';
import { DesktopMenu } from './DesktopMenu';
import { Avatar } from 'shared/ui/avatar';

const Header: FC = () => {
  const { address } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useStore(userStore, (state) => state.item);
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
          <Avatar address={address} height={10} width={10} user={user} />

          <BurgerMenu isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
        </motion.div>

        <MobileMenu isOpen={isMobileMenuOpen} navItems={navItems} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </header>
  );
};

export { Header };
