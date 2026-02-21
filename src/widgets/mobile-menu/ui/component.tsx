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
      <>
        <motion.button
          aria-label='Закрыть мобильное меню'
          className='fixed inset-0 z-40 bg-black/55 md:hidden'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className='fixed left-4 right-4 top-20 z-50 md:hidden'
        >
          <div className='overflow-hidden rounded-2xl border border-white/15 bg-black/95 p-3 shadow-2xl'>
            <ul className='flex flex-col gap-1'>
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ x: -14, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <Link
                    href={item.href}
                    className='block rounded-xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white'
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export { MobileMenu };
