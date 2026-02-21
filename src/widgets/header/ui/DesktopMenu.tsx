'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { cn } from 'shared/lib';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from 'shared/ui/nav-menu';

type Props = {
  navItems: { label: string; href: string }[];
};

const DesktopMenu: FC<Props> = ({ navItems }) => {
  const pathname = usePathname();

  return (
    <NavigationMenu className='hidden md:block'>
      <NavigationMenuList className='space-x-2'>
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
          >
            <NavigationMenuItem>
              <Link
                href={item.href}
                className={cn(
                  'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? 'bg-white/15 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            </NavigationMenuItem>
          </motion.div>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { DesktopMenu };
