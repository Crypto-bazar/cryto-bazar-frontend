import { abi } from 'shared/models';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const wagmiContractConfig = {
  address: contractAddress,
  abi: abi,
} as const;
