'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from 'shared/ui/nav-menu';

type Props = {
  navItems: { label: string; href: string }[];
};

const DesktopMenu: FC<Props> = ({ navItems }) => {
  return (
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
  );
};

export { DesktopMenu };
