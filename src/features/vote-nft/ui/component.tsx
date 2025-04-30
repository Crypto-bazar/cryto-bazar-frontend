import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { useVoteNFT } from 'features/vote-nft/hooks';

type Props = {
  proposeId: number;
  tokenOwner: string;
  address: `0x${string}` | undefined;
};

const Vote: FC<Props> = ({ proposeId, tokenOwner, address }) => {
  const { vote } = useVoteNFT();

  const onClick = () => {
    vote(proposeId);
  };
  return tokenOwner && tokenOwner !== address ? <Button onClick={onClick}>Проголосовать</Button> : <></>;
};

export { Vote };
