'use client';

import { FC, PropsWithChildren } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NFTLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AnimatePresence mode='wait' initial={true}>
      <motion.div
        key={'nft-layout'}
        initial={{ opacity: 0, scale: 0.95, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default NFTLayout;
