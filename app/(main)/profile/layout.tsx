'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ProfileNav } from './ui/profile-nav';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main className='mx-auto max-w-7xl px-6 py-6'>
      <ProfileNav />

      <AnimatePresence mode='wait' initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.95, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          // exit={{ opacity: 0, scale: 0.95, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
