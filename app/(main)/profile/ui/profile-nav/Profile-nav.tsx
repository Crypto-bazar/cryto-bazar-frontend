'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { FC } from 'react';

const navItems = [
  { href: '/profile/nfts', label: 'Мои NFT' },
  { href: '/profile/settings', label: 'Настройки' },
  { href: '/profile/favourites', label: 'Избранные NFT' },
  { href: '/profile/tokens', label: 'Токены' },
];

const ProfileNav: FC = () => {
  const pathname = usePathname();

  return (
    <nav className='mb-6 flex gap-4 border-b pb-2'>
      {navItems.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            'text-sm font-medium',
            pathname === href ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600',
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export { ProfileNav };
