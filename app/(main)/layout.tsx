import type { Metadata } from 'next';
import '../globals.css';
import { ReactNode } from 'react';
import { Header } from 'widgets/header/ui';
import localFont from 'next/font/local';
import { WagmiProvider } from 'wagmi';
import { config } from 'app/web3';
import { QueryProvider } from 'app/providers/api';
import { MockServiceWorker } from 'app/providers/mocks/MockServiceWorker';

export const metadata: Metadata = {
  title: 'Криптобазар',
  description:
    'A decentralized marketplace for buying and selling digital assets securely using blockchain technology.',
};

const openRunder = localFont({ src: './font/OpenRunde-Regular.woff' });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <QueryProvider>
      <WagmiProvider config={config}>
        <html lang='en'>
          <body className={`${openRunder.className}`}>
            <Header />
            {process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' && <MockServiceWorker />}
            {children}
          </body>
        </html>
      </WagmiProvider>
    </QueryProvider>
  );
}
