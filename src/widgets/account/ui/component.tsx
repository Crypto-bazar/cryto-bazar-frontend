'use client';

import { FC } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import Image from 'next/image';
import { Button } from 'shared/ui/button/ui';

const Account: FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <Image alt='ENS Avatar' src={ensAvatar} />}
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </div>
  );
};

export { Account };
