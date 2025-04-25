import { abi } from 'shared/models';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

const useSellNFT = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { isLoading, isSuccess, data: receipt } = useWaitForTransactionReceipt({ hash });

  const sellNFT = async (tokenId: number, price: number) => {
    return writeContractAsync({
      abi: abi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'sellNFT',
      args: [BigInt(tokenId), BigInt(price)],
    });
  };

  return { sellNFT, isLoading, isSuccess, receipt };
};

export { useSellNFT };
