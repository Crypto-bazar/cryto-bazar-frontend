'use client';
import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Props = {
  isOpen: boolean;
  navItems: { href: string; label: string }[];
  onClose: () => void;
};

const MobileMenu: FC<Props> = ({ isOpen, navItems, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className='absolute left-0 top-[70px] z-50 w-full overflow-hidden bg-[#000000] shadow-lg md:hidden'
      >
        <div className='container mx-auto px-6 py-4'>
          <ul className='flex flex-col space-y-4'>
            {navItems.map((item) => (
              <motion.li
                key={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className='block py-2 text-lg transition-all hover:text-[#3c7a89]'
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export { MobileMenu };
