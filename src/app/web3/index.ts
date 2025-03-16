'use client';

import { createConfig, http, injected } from '@wagmi/core';
import { hardhat } from '@wagmi/core/chains';

export const config = createConfig({
  chains: [hardhat],
  ssr: true,
  connectors: [injected()],
  transports: {
    [hardhat.id]: http(),
  },
});


export * from "./contract"
