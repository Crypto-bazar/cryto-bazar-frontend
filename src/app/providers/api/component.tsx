'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { config } from 'app/web3';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        {children}
        <Toaster position='top-center' richColors />
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export { QueryProvider };
