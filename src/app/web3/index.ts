'use client';

import { createConfig, webSocket, injected } from '@wagmi/core';
import { hardhat } from '@wagmi/core/chains';

const nodeUrl = process.env.NEXT_PUBLIC_HARDHAT_NODE;

export const config = createConfig({
  chains: [hardhat],
  ssr: true,
  connectors: [injected()],
  transports: {
    [hardhat.id]: webSocket(nodeUrl),
  },
});

export * from './contract';
