import { DAOabi } from 'shared/models';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

const useCreateToken = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { data: receipt, isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createToken = async (uri: string) => {
    return await writeContractAsync({
      abi: DAOabi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'mintToken',
      args: [uri],
    });
  };

  return { createToken, receipt, isLoading, isSuccess };
};

export { useCreateToken };
