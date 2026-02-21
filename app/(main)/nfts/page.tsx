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
    <main className='mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8'>
      <section className='mb-6 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-slate-500'>Каталог</p>
            <h1 className='mt-1 text-3xl font-bold tracking-tight text-slate-900'>NFT коллекции</h1>
            <p className='mt-1 text-sm text-slate-600'>
              Найдено: <span className='font-semibold text-slate-900'>{filteredItems.length}</span>
            </p>
          </div>
          <div className='flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center'>
            <FindBar className='max-w-none sm:w-[380px]' />
            <Sort />
          </div>
        </div>
      </section>

      {filteredItems && filteredItems.length !== 0 ? (
        <NFTs items={filteredItems} />
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            layout
          >
            <h2 className='mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center text-2xl font-semibold text-slate-600 shadow-sm'>
              Ничего не найдено. Попробуйте другое название или описание.
            </h2>
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
};

export default NFTPage;
