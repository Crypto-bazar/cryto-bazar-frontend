import { useReadContract } from 'wagmi';
import { DAOabi } from 'shared/models';

export const useGetRequiredVotes = () => {
  const { data, isLoading, error } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: DAOabi,
    functionName: 'getRequiredVotes',
  });

  return {
    requiredVotes: data ? Number(data) / 1e18 : 0,
    isLoading,
    error,
  };
};
