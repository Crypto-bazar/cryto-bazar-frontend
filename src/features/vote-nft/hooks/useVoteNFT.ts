import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { DAOabi } from 'shared/models';

const useVoteNFT = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { isLoading, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash });

  const vote = async (proposalId: number) => {
    return writeContractAsync({
      abi: DAOabi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'voteForNFT',
      args: [BigInt(proposalId)],
    });
  };
  return { vote, isLoading, isSuccess, receipt };
};

const useGetVoteNFT = (id: bigint) => {
  const { address } = useAccount();
  const { data, isLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: DAOabi,
    functionName: 'hasVoted',
    args: [id, address!],
  });

  return { isLoading, error, data };
};

export { useVoteNFT, useGetVoteNFT };
