'use client';

import { FC } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

const Account: FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <img alt='ENS Avatar' src={ensAvatar} />}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
};

export { Account };
