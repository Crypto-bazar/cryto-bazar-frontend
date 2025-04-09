'use client';

import { createConfig, webSocket, injected } from '@wagmi/core';
import { hardhat } from '@wagmi/core/chains';

export const config = createConfig({
  chains: [hardhat],
  ssr: true,
  connectors: [injected()],
  transports: {
    [hardhat.id]: webSocket('http://127.0.0.1:8545'),
  },
});

export * from './contract';
