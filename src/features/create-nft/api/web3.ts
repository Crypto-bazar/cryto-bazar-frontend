import { abi } from '@/shared/api';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

const useCreateToken = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { data: receipt, isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createToken = async (id: number, name: string, symb: string, uri: string) => {
    const txHash = await writeContractAsync({
      abi: abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'createNFT',
      args: [name, symb, uri],
    });

    console.log(txHash);

    return txHash;
  };

  const logs = receipt?.logs;

  return { createToken, receipt, isLoading, isSuccess, logs };
};

export { useCreateToken };
