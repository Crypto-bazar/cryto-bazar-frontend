import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { abi } from 'shared/models';

const useVoteNFT = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { isLoading, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash });

  const vote = async (proposalId: number) => {
    return writeContractAsync({
      abi: abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'voteForNFT',
      args: [BigInt(proposalId)],
    });
  };
  return { vote, isLoading, isSuccess, receipt };
};

export { useVoteNFT };
