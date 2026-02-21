'use client';
import { FC, useEffect, useState } from 'react';
import { Connector } from '@wagmi/core';
import { Button } from 'shared/ui/button';

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
    <Button
      className='h-9 rounded-full bg-white px-4 text-sm font-semibold text-black shadow-sm hover:bg-slate-200'
      disabled={!ready}
      onClick={onClick}
    >
      {connector.name}
    </Button>
  );
};

export { WalletOption };
