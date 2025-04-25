import { DAOabi } from 'shared/models';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const wagmiContractConfig = {
  address: contractAddress,
  abi: DAOabi,
} as const;
