'use client';

import { FC } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { Button } from 'shared/ui/button';

const Account: FC = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className='flex items-center gap-2'>
      {ensAvatar && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt='ENS Avatar' src={ensAvatar} className='h-7 w-7 rounded-full border border-white/40' />
        </>
      )}
      <Button
        variant='secondary'
        className='h-9 rounded-full bg-white/95 px-4 text-sm font-semibold text-black shadow-sm hover:bg-white'
        onClick={() => disconnect()}
      >
        Отключить
      </Button>
    </div>
  );
};

export { Account };
