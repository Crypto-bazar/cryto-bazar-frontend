'use client';
import { FC } from 'react';
import { NFTCard } from 'entities/nft/ui';
import { NFT } from 'entities/nft/models';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  items: NFT[];
};

const NFTs: FC<Props> = ({ items }) => {
  return (
    <div className='grid grid-cols-1 gap-5 py-4 md:grid-cols-2 lg:grid-cols-3'>
        <AnimatePresence>
          {items &&
            items.length !== 0 &&
            items.map((nft) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                layout
              >
                <Link href={`/nft/${nft.id}`} className='block h-full'>
                  <NFTCard nft={nft} />
                </Link>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
  );
};

export { NFTs };
