import { DAOabi } from 'shared/models';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useEffect } from 'react';
import { useGetAllNFTs } from 'entities/nft/hooks/hooks';

const useSellNFT = () => {
  const { refetch, isSuccess: getNFTSuc } = useGetAllNFTs();
  useEffect(() => {
    if (getNFTSuc) {
      refetch();
    }
  }, [getNFTSuc, refetch]);

  const { writeContractAsync, data: hash } = useWriteContract();
  const { isLoading, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash });

  const sellNFT = async (tokenId: number, price: number) => {
    return writeContractAsync({
      abi: DAOabi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'listNFT',
      args: [BigInt(tokenId), BigInt(price)],
    });
  };

  return { sellNFT, isLoading, isSuccess, receipt };
};

export { useSellNFT };
