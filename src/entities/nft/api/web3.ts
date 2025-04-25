import { readContract } from '@wagmi/core';
import { config } from 'app/web3';
import { DAOabi } from 'shared/models';

const getProposalNFT = async () => {
  const result = await readContract(config, {
    abi: DAOabi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'getProposeNFT',
  });
  return result;
};

export { getProposalNFT };
