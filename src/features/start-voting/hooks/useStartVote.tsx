import { abi } from 'shared/models';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

const useStartVote = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { isLoading, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash });
  const startVote = async (tokenUri: string) => {
    return writeContractAsync({
      abi: abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'proposeNFT',
      args: [tokenUri],
    });
  };
  return { startVote, isLoading, isSuccess, receipt };
};

export { useStartVote };
