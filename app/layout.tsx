import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import localFont from 'next/font/local';
import { Header } from 'widgets/header/ui';
import { QueryProvider } from 'app/providers/api';

export const metadata: Metadata = {
  title: 'Криптобазар',
  description:
    'A decentralized marketplace for buying and selling digital assets securely using blockchain technology.',
};

const openRunder = localFont({ src: './(main)/font/OpenRunde-Regular.woff' });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={openRunder.className}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
