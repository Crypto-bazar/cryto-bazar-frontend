'use client';

import { useAuth } from '@/widgets/header/hooks';
import { FC } from 'react';
import { useAccount } from 'wagmi';
import { Account } from 'widgets/account/ui';
import { WalletOptions } from 'widgets/wallet-options/ui';

const ConnectWallet: FC = () => {
  useAuth();
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
};

export { ConnectWallet };
