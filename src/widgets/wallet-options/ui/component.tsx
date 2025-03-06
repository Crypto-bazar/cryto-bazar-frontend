'use client';
import { FC } from 'react';
import { useConnect } from 'wagmi';
import { WalletOption } from 'entities/wallet-option/ui';

const WalletOptions: FC = () => {
  const { connect, connectors } = useConnect();

  return connectors.map((connector) => (
    <WalletOption key={connector.uid} connector={connector} onClick={() => connect({ connector })} />
  ));
};

export { WalletOptions };
