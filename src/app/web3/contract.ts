import { abi } from '../../shared/api/abi';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const wagmiContractConfig = {
  address: contractAddress,
  abi: abi,
} as const;
