import { addFavouriteNFT } from 'entities/nft/api';
import { Heart } from 'lucide-react';
import { FC } from 'react';
import { Button } from 'shared/ui/button';

type Props = {
  address: `0x${string}` | undefined;
  id: number;
  isFavourite: boolean;
  onChange?: () => void;
};

const AddFavouriteButton: FC<Props> = ({ address, id, isFavourite, onChange }) => {
  const handleRemove = async () => {
    await addFavouriteNFT(address!, id);
    onChange?.();
  };

  return (
    address &&
    !isFavourite && (
      <Button
        variant='outline'
        size='sm'
        onClick={handleRemove}
        className='transition-transform duration-150 active:scale-95'
      >
        <Heart className='mr-2 h-4 w-4' />
        Добавить в избранное
      </Button>
    )
  );
};

export { AddFavouriteButton };
