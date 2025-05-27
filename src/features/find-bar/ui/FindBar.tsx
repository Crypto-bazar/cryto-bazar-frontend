import { useStore } from '@tanstack/react-store';
import { nftActions, nftStore } from 'entities/nft/models';
import { FC } from 'react';
import { Command, CommandInput } from 'shared/ui/command';

const FindBar: FC = () => {
  const value = useStore(nftStore, (state) => state.searchQuery);

  return (
    <div className='mx-auto mt-10 max-w-md'>
      <Command className='rounded-lg border shadow-md'>
        <CommandInput
          placeholder='Поиск NFT...'
          value={value}
          onValueChange={(search) => {
            nftActions.setSearchQuery(search);
          }}
        />
      </Command>
    </div>
  );
};

export { FindBar };
