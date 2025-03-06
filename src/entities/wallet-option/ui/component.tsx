'use client';
import { FC, useEffect, useState } from 'react';
import { Connector } from '@wagmi/core';
import { Button } from 'shared/ui/button/ui';

type Props = {
  connector: Connector;
  onClick: () => void;
};

const WalletOption: FC<Props> = ({ connector, onClick }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick}>
      {connector.name}
    </Button>
  );
};

export { WalletOption };
