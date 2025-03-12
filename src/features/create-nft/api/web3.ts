import { abi } from '@/shared/api';
import { useWriteContract } from 'wagmi';

const useCreateToken = () => {
  const { writeContract } = useWriteContract();

  return (name: string, symb: string, uri: string) => {
    writeContract({
      abi: abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'createNFT',
      args: [name, symb, uri],
    });
  };
};

export { useCreateToken };
