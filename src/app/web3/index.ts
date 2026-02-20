'use client';

import { createConfig, http } from 'wagmi';
import { hardhat } from 'wagmi/chains';
import { injected } from '@wagmi/core';

const nodeUrl = process.env.NEXT_PUBLIC_HARDHAT_NODE || 'http://127.0.0.1:8545';

export const config = createConfig({
  chains: [hardhat],
  ssr: true,
  connectors: [injected()],
  transports: {
    [hardhat.id]: http(nodeUrl),
  },
});

export * from './contract';
