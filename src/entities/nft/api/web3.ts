import { readContract } from '@wagmi/core';
import { config } from 'app/web3';
import { DAOabi } from 'shared/models';

const getProposalNFT = async () => {
  return await readContract(config, {
    abi: DAOabi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'getProposeNFT',
  });
};

export { getProposalNFT };
