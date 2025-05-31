import { useStore } from '@tanstack/react-store';
import { nftStore } from 'entities/nft/models';
import { ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'shared/ui/dropdown-menu';

const Sort: FC = () => {
  const value = useStore(nftStore, (state) => state.sortItem);
  const items = useStore(nftStore, (state) => state.items);

  const sortItems = (type: 'az' | 'za') => {
    nftStore.setState((prev) => ({ ...prev, sortItem: type }));
    const sortedItems = [...items].sort((a, b) => {
      if (type === 'az') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    nftStore.setState((prev) => ({ ...prev, items: sortedItems }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {value === 'az' ? <ArrowDownAZ className='mr-2 h-4 w-4' /> : <ArrowUpZA className='mr-2 h-4 w-4' />}
          {value === 'az' ? 'A–Z' : 'Z–A'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => sortItems('az')}>
          <ArrowDownAZ className='mr-2 h-4 w-4' />
          По алфавиту (A–Z)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => sortItems('za')}>
          <ArrowUpZA className='mr-2 h-4 w-4' />
          По алфавиту (Z–A)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Sort };
