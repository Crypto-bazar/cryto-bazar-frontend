import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { useVoteNFT } from 'features/vote-nft/hooks';

type Props = {
  proposeId: number;
};

const Vote: FC<Props> = ({ proposeId }) => {
  const { vote } = useVoteNFT();

  const onClick = () => {
    vote(proposeId);
  };
  return <Button onClick={onClick}>Проголосовать</Button>;
};

export { Vote };
