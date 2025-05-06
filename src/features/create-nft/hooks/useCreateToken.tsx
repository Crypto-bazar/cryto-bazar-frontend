import { DAOabi } from 'shared/models';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useGetAllNFTs } from 'entities/nft/hooks/hooks';

const useCreateToken = () => {
  const { writeContractAsync, data: hash } = useWriteContract();
  const { data: receipt, isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Включаем функцию для получения всех NFT
  const { refetch } = useGetAllNFTs();

  const createToken = async (name: string, description: string, imagePath: string) => {
    // Создание нового токена
    await writeContractAsync({
      abi: DAOabi,
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      functionName: 'proposeNFT',
      args: [name, description, imagePath],
    });
  };

  // Обновляем список NFT после успешного создания токена
  if (isSuccess) {
    refetch(); // Вызываем refetch, чтобы обновить все NFT
  }

  return { createToken, receipt, isLoading, isSuccess };
};

export { useCreateToken };
