import { removeFavouriteNFT } from 'entities/nft/api';
import { BookmarkMinus } from 'lucide-react';
import { FC } from 'react';
import { Button } from 'shared/ui/button';

type Props = {
  address: `0x${string}` | undefined;
  id: number;
  isFavourite: boolean;
};

const RemoveFavouriteButton: FC<Props> = ({ address, id, isFavourite }) => {
  return (
    <>
      {address && isFavourite && (
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            removeFavouriteNFT(address, id);
          }}
          className='transition-transform duration-150 active:scale-95'
        >
          <BookmarkMinus className='mr-2 h-4 w-4' />
          Убрать из избранное
        </Button>
      )}
    </>
  );
};

export { RemoveFavouriteButton };
