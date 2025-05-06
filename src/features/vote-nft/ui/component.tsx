import { FC, useEffect } from 'react';
import { Button } from 'shared/ui/button';
import { useVoteNFT } from 'features/vote-nft/hooks';

type Props = {
  proposeId: number;
  tokenOwner: string;
  address: `0x${string}` | undefined;
  onSuccess?: () => void;
};

const Vote: FC<Props> = ({ proposeId, tokenOwner, address, onSuccess }) => {
  const { vote, isSuccess, isLoading } = useVoteNFT();

  const onClick = () => {
    vote(proposeId);
  };

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.();
    }
  }, [isSuccess, onSuccess]);

  if (!tokenOwner || tokenOwner === address) return null;

  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isLoading ? 'Голосуем...' : 'Проголосовать'}
    </Button>
  );
};

export { Vote };
