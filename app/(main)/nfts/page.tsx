'use client';

import { NFTs } from 'widgets/nfts/ui';
import { FC } from 'react';
import { useGetAllNFTs } from 'entities/nft/hooks/hooks';
import { useStore } from '@tanstack/react-store';
import { nftStore } from 'entities/nft/models';
import { FindBar } from 'features/find-bar/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { Sort } from 'features/sort';

const NFTPage: FC = () => {
  useGetAllNFTs();
  const items = useStore(nftStore, (state) => state.items);
  const search = useStore(nftStore, (state) => state.searchQuery);
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className='mx-auto max-w-7xl px-8 py-8 sm:px-4 sm:py-4 md:px-6 md:py-6'>
      <FindBar />
      <Sort />

      {filteredItems && filteredItems.length !== 0 ? (
        <>
          <h1>NFT в продаже</h1>
          <NFTs items={filteredItems} />
        </>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            layout
          >
            <h1 className='animate-fade-in mt-12 rounded-2xl border border-dashed border-gray-300 bg-white/70 px-6 py-12 text-center text-2xl font-semibold text-gray-600 shadow-md backdrop-blur-sm transition-opacity'>
              😢 В данный момент нет NFT в коллекции или неверное название / описание!
            </h1>
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
};

export default NFTPage;
