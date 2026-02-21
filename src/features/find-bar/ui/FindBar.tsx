import { useStore } from '@tanstack/react-store';
import { nftActions, nftStore } from 'entities/nft/models';
import { FC } from 'react';
import { cn } from 'shared/lib';
import { Command, CommandInput } from 'shared/ui/command';

type Props = {
  className?: string;
};

const FindBar: FC<Props> = ({ className }) => {
  const value = useStore(nftStore, (state) => state.searchQuery);

  return (
    <div className={cn('w-full max-w-xl', className)}>
      <Command className='rounded-xl border border-slate-200 bg-white shadow-sm'>
        <CommandInput
          placeholder='Поиск по названию или описанию...'
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
