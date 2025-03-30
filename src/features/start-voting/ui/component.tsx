import { FC } from 'react';
import { Button } from 'shared/ui/button';
import { useStartVote } from '../hooks';

type Props = {
  tokenUri: string;
};

const StartVoting: FC<Props> = ({ tokenUri }) => {
  const { startVote } = useStartVote();

  const onClick = () => {
    startVote(tokenUri);
  };
  return <Button onClick={onClick}>Запустить голосование</Button>;
};

export { StartVoting };
