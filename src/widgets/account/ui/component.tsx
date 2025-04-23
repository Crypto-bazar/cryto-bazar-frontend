'use client';

import { FC } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import Image from 'next/image';
import { Button } from 'shared/ui/button';

const Account: FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      {ensAvatar && <Image alt='ENS Avatar' src={ensAvatar} />}
      <Button className={'bg-[#fff] text-black hover:bg-[#c1c1c1]'} onClick={() => disconnect()}>
        Отключить
      </Button>
    </div>
  );
};

export { Account };
