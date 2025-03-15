import { abi } from '@/shared/api';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

const useCreateToken = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { data: receipt, isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createToken = async (uri: string) => {
    const txHash = await writeContractAsync({
      abi: abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'mintToken',
      args: [uri],
    });

    return txHash;
  };

  return { createToken, receipt, isLoading, isSuccess };
};

export { useCreateToken };
